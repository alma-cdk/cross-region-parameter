import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cdk from 'aws-cdk-lib/core';
import * as cr from 'aws-cdk-lib/custom-resources';
import { pascalCase } from 'change-case';
import { Construct } from 'constructs';

type Tag = {
  [key: string]: string;
}

export interface CrossRegionParameterProps {
  readonly region: string;
  readonly name: string;
  readonly description: string;
  readonly value: string;
  readonly allowedPattern?: string;
  readonly keyId?: string;

  /**
   * Tier
   * @default
   * "Standard"
   */
  readonly parameterTier?: ssm.ParameterTier;

  /**
   * Type
   * @default
   * "String"
   */
  readonly parameterType?: ssm.ParameterType;
  readonly tags?: Tag[];

  /**
   * Parameter policies
   * @link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html#putParameter-property
   * @link https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html
   */
  readonly policies?: string;
}

export enum OnEvent {
  ON_CREATE='onCreate',
  ON_UPDATE='onUpdate',
  ON_DELETE='onDelete',
}

export class CrossRegionParameter extends Construct {
  constructor(scope: Construct, name: string, props: CrossRegionParameterProps) {
    super(scope, name);

    const st = this.definePolicy(props);

    const policy = new iam.Policy(this, `${pascalCase(name)}CrPolicy`, { statements: [st] });

    const role = new iam.Role(this, 'ParameterCrRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    role.attachInlinePolicy(policy);

    const customResource = new cr.AwsCustomResource(this, 'AwsCustomResource', {
      onCreate: this.defineCreateUpdateSdkCall(OnEvent.ON_CREATE, props),
      onUpdate: this.defineCreateUpdateSdkCall(OnEvent.ON_UPDATE, props),
      onDelete: this.defineDeleteSdkCall(props),
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

    return {
      physicalResourceId: this.definePhysicalResourceId(props),
      region,
      service: 'SSM',
      action: 'putParameter',
      parameters: {
        Name: name, /* required */
        Value: value, /* required */
        AllowedPattern: allowedPattern,
        Description: description,
        KeyId: keyId,
        Overwrite: eventType !== OnEvent.ON_CREATE,
        Policies: policies,
        Tags: tags,
        Tier: tier,
        Type: type,
      },
    };
  }

  private defineDeleteSdkCall(props: CrossRegionParameterProps): cr.AwsSdkCall {

    const { region, name } = props;

    return {
      physicalResourceId: this.definePhysicalResourceId(props),
      region,
      service: 'SSM',
      action: 'deleteParameter',
      parameters: {
        Name: name,
      },
    };
  }

  private definePolicy(props: CrossRegionParameterProps): iam.PolicyStatement {
    const { region, name } = props;

    // Depending if path paramater or simple parameter we may or may not need to set a slash separator to resource ARN
    const separator = name.indexOf('/') === 0 ? '' : '/';

    return new iam.PolicyStatement({
      actions: ['ssm:PutParameter', 'ssm:DeleteParameter'],
      resources: [`arn:aws:ssm:${region}:${cdk.Stack.of(this).account}:parameter${separator}${name}`],
      effect: iam.Effect.ALLOW,
    });
  }
}
