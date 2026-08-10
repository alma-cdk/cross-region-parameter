import { App, Stack } from "aws-cdk-lib";
import { Annotations, Match, Template } from "aws-cdk-lib/assertions";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { CrossRegionParameter, CrossRegionParameterProps } from "../src";

const ACCOUNT = "123456789012";
const SOURCE_REGION = "eu-west-1";
const TARGET_REGION = "eu-north-1";

const baseProps: CrossRegionParameterProps = {
  region: TARGET_REGION,
  name: "/parameter/path/message",
  description: "Some message for the Swedes!",
  value: "Hej då!",
};

interface AwsSdkCall {
  readonly physicalResourceId: { readonly id: string };
  readonly region: string;
  readonly service: string;
  readonly action: string;
  readonly parameters: Record<string, unknown>;
}

/** Synthesize a stack containing a single CrossRegionParameter. */
function synth(
  props: Partial<CrossRegionParameterProps> = {},
  sourceRegion: string = SOURCE_REGION,
): Stack {
  const stack = new Stack(new App(), "TestStack", {
    env: { account: ACCOUNT, region: sourceRegion },
  });
  new CrossRegionParameter(stack, "SayHiToSweden", { ...baseProps, ...props });
  return stack;
}

/** Extract the three AwsSdkCall payloads out of the Custom::AWS resource. */
function sdkCalls(stack: Stack): Record<string, AwsSdkCall> {
  const resources = Template.fromStack(stack).findResources("Custom::AWS");
  const [resource] = Object.values(resources);
  return {
    onCreate: JSON.parse(resource.Properties.Create),
    onUpdate: JSON.parse(resource.Properties.Update),
    onDelete: JSON.parse(resource.Properties.Delete),
  };
}

describe("IAM", () => {
  test("grants parameter write access in the target region", () => {
    Template.fromStack(synth()).hasResourceProperties("AWS::IAM::Policy", {
      PolicyDocument: {
        Statement: [
          {
            Action: ["ssm:PutParameter", "ssm:DeleteParameter"],
            Effect: "Allow",
            Resource: `arn:aws:ssm:${TARGET_REGION}:${ACCOUNT}:parameter/parameter/path/message`,
          },
        ],
      },
    });
  });

  test("inserts a separator for simple (non-path) parameter names", () => {
    Template.fromStack(synth({ name: "message" })).hasResourceProperties(
      "AWS::IAM::Policy",
      {
        PolicyDocument: {
          Statement: [
            Match.objectLike({
              Resource: `arn:aws:ssm:${TARGET_REGION}:${ACCOUNT}:parameter/message`,
            }),
          ],
        },
      },
    );
  });

  test("creates a Lambda-assumable role for the custom resource", () => {
    Template.fromStack(synth()).hasResourceProperties("AWS::IAM::Role", {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: "sts:AssumeRole",
            Effect: "Allow",
            Principal: { Service: "lambda.amazonaws.com" },
          },
        ],
      },
    });
  });

  test("makes the custom resource depend on the role", () => {
    const template = Template.fromStack(synth());
    const [roleId] = Object.keys(template.findResources("AWS::IAM::Role"));
    const [customResource] = Object.values(
      template.findResources("Custom::AWS"),
    );

    expect(customResource.DependsOn).toContain(roleId);
  });
});

describe("SDK calls", () => {
  test("puts the parameter into the target region on create", () => {
    const { onCreate } = sdkCalls(synth());

    expect(onCreate).toMatchObject({
      region: TARGET_REGION,
      service: "SSM",
      action: "putParameter",
    });
  });

  test("does not overwrite on create, but does on update", () => {
    const { onCreate, onUpdate } = sdkCalls(synth());

    expect(onCreate.parameters.Overwrite).toBe(false);
    expect(onUpdate.parameters.Overwrite).toBe(true);
  });

  test("deletes the parameter by name on delete", () => {
    const { onDelete } = sdkCalls(synth());

    expect(onDelete).toMatchObject({
      region: TARGET_REGION,
      service: "SSM",
      action: "deleteParameter",
      parameters: { Name: baseProps.name },
    });
  });

  test("uses the same physical resource id for every event", () => {
    const { onCreate, onUpdate, onDelete } = sdkCalls(synth());
    const expected = { id: "CrossRegionParameterEuNorth1ParameterPathMessage" };

    expect(onCreate.physicalResourceId).toEqual(expected);
    expect(onUpdate.physicalResourceId).toEqual(expected);
    expect(onDelete.physicalResourceId).toEqual(expected);
  });

  test("defaults to the standard tier and string type", () => {
    const { onCreate } = sdkCalls(synth());

    expect(onCreate.parameters).toEqual({
      Name: baseProps.name,
      Value: baseProps.value,
      Description: baseProps.description,
      Overwrite: false,
      Tier: ssm.ParameterTier.STANDARD,
      Type: ssm.ParameterType.STRING,
    });
  });

  test("passes through every optional parameter", () => {
    const { onCreate } = sdkCalls(
      synth({
        allowedPattern: "^\\d+$",
        keyId: "1234abcd-12ab-34cd-56ef-1234567890ab",
        parameterTier: ssm.ParameterTier.ADVANCED,
        parameterType: ssm.ParameterType.SECURE_STRING,
        policies: '[{"Type":"Expiration"}]',
      }),
    );

    expect(onCreate.parameters).toMatchObject({
      AllowedPattern: "^\\d+$",
      KeyId: "1234abcd-12ab-34cd-56ef-1234567890ab",
      Policies: '[{"Type":"Expiration"}]',
      Tier: ssm.ParameterTier.ADVANCED,
      Type: ssm.ParameterType.SECURE_STRING,
    });
  });

  test("converts tag props into an SDK tag list", () => {
    const { onCreate } = sdkCalls(
      synth({
        tags: [
          { key: "Foo", value: "Bar" },
          { key: "Baz", value: "Qux" },
        ],
      }),
    );

    expect(onCreate.parameters.Tags).toEqual([
      { Key: "Foo", Value: "Bar" },
      { Key: "Baz", Value: "Qux" },
    ]);
  });

  test("omits tags when none are given", () => {
    const { onCreate } = sdkCalls(synth());

    expect(onCreate.parameters).not.toHaveProperty("Tags");
  });
});

describe("region validation", () => {
  test("reports an error when the target region is the source region", () => {
    const stack = synth({ region: TARGET_REGION }, TARGET_REGION);

    Annotations.fromStack(stack).hasError(
      "*",
      `Parameter target region ${TARGET_REGION} can not be the same as source region ${TARGET_REGION}`,
    );
  });

  test("reports no error when the regions differ", () => {
    Annotations.fromStack(synth()).hasNoError("*", Match.anyValue());
  });
});
