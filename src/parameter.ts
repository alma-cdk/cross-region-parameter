import { PutParameterCommandInput, Tag } from '@aws-sdk/client-ssm';
import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cr from 'aws-cdk-lib/custom-resources';
import { pascalCase } from 'change-case';
import { Construct } from 'constructs';
import { merge } from 'ts-deepmerge';
import { addError } from './errors/add';
import { CrossRegionParameterProps, TagPropList } from './props';

export enum OnEvent {
  ON_CREATE='onCreate',
  ON_UPDATE='onUpdate',
  ON_DELETE='onDelete',
}

/** Cross-Region SSM Parameter. */
export class CrossRegionParameter extends Construct {
  private readonly uniqueTagKey: string = '@alma-cdk/cross-region-parameter:fromConstruct';
  private readonly uniqueTagValue: string;
  /**
   * Define a new Cross-Region SSM Parameter.
   *
   * @example
   * new CrossRegionParameter(this, 'SayHiToSweden', {
   *   region: 'eu-north-1',
   *   name: '/parameter/path/message',
   *   description: 'Some message for the Swedes',
   *   value: 'Hej då!',
   * });
   */
  constructor(scope: Construct, name: string, props: CrossRegionParameterProps) {
    super(scope, name);
    const withDefaults = merge(props, {
      tags: [{ key: this.uniqueTagKey, value: this.node.path }],
    });
    this.uniqueTagValue = this.node.path;

    this.validateRegion(withDefaults.region);

    const st = this.definePolicy(withDefaults);

    const policy = new iam.Policy(this, `${pascalCase(name)}CrPolicy`, { statements: [st] });

    const role = new iam.Role(this, 'ParameterCrRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    role.attachInlinePolicy(policy);

    const customResource = new cr.AwsCustomResource(this, 'AwsCustomResource', {
      onCreate: this.defineCreateUpdateSdkCall(OnEvent.ON_CREATE, withDefaults),
      onUpdate: this.defineCreateUpdateSdkCall(OnEvent.ON_UPDATE, withDefaults),
      onDelete: this.defineDeleteSdkCall(withDefaults),
      policy: cr.AwsCustomResourcePolicy.fromStatements([st]),
      role,
    });

    customResource.node.addDependency(role);
  }

  private definePhysicalResourceId(props: CrossRegionParameterProps): cr.PhysicalResourceId {
    const { region, name } = props;
    return cr.PhysicalResourceId.of(`CrossRegionParameter${pascalCase(region)}${pascalCase(name)}`);
  }

  private defineCreateUpdateSdkCall(eventType: OnEvent, props: CrossRegionParameterProps): cr.AwsSdkCall {
    const {
      region,
      name,
      description,
      value,
      allowedPattern,
      keyId,
      parameterTier: tier = ssm.ParameterTier.STANDARD,
      parameterType: type = ssm.ParameterType.STRING,
      tags,
      policies,
    } = props;

    const parameters: PutParameterCommandInput = {
      Name: name, /* required */
      Value: value, /* required */
      AllowedPattern: allowedPattern,
      Description: description,
      KeyId: keyId,
      Overwrite: eventType !== OnEvent.ON_CREATE,
      Policies: policies,
      Tags: this.tagPropsToTagParams(tags),
      Tier: tier,
      DataType: type,

    };

    return {
      physicalResourceId: this.definePhysicalResourceId(props),
      region,
      service: 'SSM',
      action: 'putParameter',
      parameters,
    };
  }

  /** Ensure Parameter target region is not the same as the current "source" region. */
  private validateRegion(region: string): void {
    const currentRegion = Stack.of(this).region;
    if (currentRegion === region) {
      addError(this, `Parameter target region ${region} can not be the same as source region ${currentRegion}`);
    }
  }

  /** Convert CDK/JSII compatible TagPropList to SDK compatible TagList. */
  private tagPropsToTagParams(tags?: TagPropList): Tag[] | undefined {
    return tags?.map(t => ({
      Key: t.key,
      Value: t.value,
    }));
  }

  private defineDeleteSdkCall(props: CrossRegionParameterProps): cr.AwsSdkCall {

    const { region, name } = props;

    return {
      physicalResourceId: this.definePhysicalResourceId(props),
      region,
      service: 'ssm',
      action: 'DeleteParameter',
      parameters: {
        Name: name,
      },
    };
  }

  private definePolicy(props: CrossRegionParameterProps): iam.PolicyStatement {
    const { region, name } = props;

    // Depending if path parameter or simple parameter we may or may not need to set a slash separator to resource ARN
    const separator = name.indexOf('/') === 0 ? '' : '/';

    return new iam.PolicyStatement({
      actions: ['ssm:PutParameter', 'ssm:DeleteParameter', 'ssm:AddTagsToResource'],
      resources: [`arn:aws:ssm:${region}:${Stack.of(this).account}:parameter${separator}*`],
      effect: iam.Effect.ALLOW,
      conditions: {
        StringEquals: {
          [`aws:ResourceTag/${this.uniqueTagKey}`]: this.uniqueTagValue,
        },
      },
    });
  }
}
