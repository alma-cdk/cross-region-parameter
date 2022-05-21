import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cdk from 'aws-cdk-lib/core';
import * as cr from 'aws-cdk-lib/custom-resources';
import { PutParameterRequest, TagList } from 'aws-sdk/clients/ssm';
import { pascalCase } from 'change-case';
import { Construct } from 'constructs';
import { CrossRegionParameterProps, TagPropList } from './props';

export enum OnEvent {
  ON_CREATE='onCreate',
  ON_UPDATE='onUpdate',
  ON_DELETE='onDelete',
}

export class CrossRegionParameter extends Construct {
  constructor(scope: Construct, name: string, props: CrossRegionParameterProps) {
    super(scope, name);

    const st = this.definePolicy(props);

    // TODO validate regions (should not match)

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

    const parameters: PutParameterRequest = {
      Name: name, /* required */
      Value: value, /* required */
      AllowedPattern: allowedPattern,
      Description: description,
      KeyId: keyId,
      Overwrite: eventType !== OnEvent.ON_CREATE,
      Policies: policies,
      Tags: this.tagPropsToTagParams(tags),
      Tier: tier,
      Type: type,
    };

    return {
      physicalResourceId: this.definePhysicalResourceId(props),
      region,
      service: 'SSM',
      action: 'putParameter',
      parameters,
    };
  }

  /** Convert CDK/JSII compatible TagPropList to SDK compatible TagList. */
  private tagPropsToTagParams(tags?: TagPropList): TagList | undefined {
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
