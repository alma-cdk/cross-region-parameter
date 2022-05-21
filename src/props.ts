import * as ssm from 'aws-cdk-lib/aws-ssm';
import { AllowedPattern, ParameterDescription, ParameterKeyId } from 'aws-sdk/clients/ssm';

//export { AllowedPattern, ParameterDescription, ParameterKeyId, Tag, TagKey, TagValue } from 'aws-sdk/clients/ssm';

export interface CrossRegionParameterProps {

  /**
   * Target region for the parameter.
   * Must be some other region than the current Stack's region.
   *
   * @example
   * 'eu-north-1'
   */
  readonly region: string;

  /**
   * SSM Parameter name.
   *
   * @example
   * '/parameter/path/message'
   */
  readonly name: string;

  /**
   * Information about the SSM Parameter that you want to add.
   * Required by this construct (AWS considers it as optional).
   *
   * @example
   * 'Some message for the Swedes'
   */
  readonly description: ParameterDescription;

  /**
   * The SSM Parameter value that you want to add.
   *
   * Limits:
   * - Standard parameters have a value limit of 4 KB.
   * - Advanced parameters have a value limit of 8 KB.
   *
   * @example
   * 'Hej då!'
   */
  readonly value: string;

  /**
   * A regular expression used to validate the SSM Parameter Value.
   *
   * For example, for String types with values restricted to numbers,
   * you can specify the following: `^\d+$`.
   *
   * @see https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_PutParameter.html#systemsmanager-PutParameter-request-AllowedPattern
   *
   * @example
   * '^\d+$'
   */
  readonly allowedPattern?: AllowedPattern;

  /**
   * The AWS Key Management Service (AWS KMS) ID that you want to use to encrypt a parameter. Either the default AWS KMS key automatically assigned to your AWS account or a custom key. Required for parameters that use the SecureString data type.
   *
   * The KMS Key must exists in the target region.
   *
   * If you don't specify a key ID, the system uses the default key associated with your AWS account.
   *
   * @see https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_PutParameter.html#systemsmanager-PutParameter-request-KeyId
   *
   * @example
   * '1234abcd-12ab-34cd-56ef-1234567890ab'
   */
  readonly keyId?: ParameterKeyId;

  /**
   * The SSM Parameter Tier to assign to a parameter.
   *
   * - Parameter Store offers a standard tier and an advanced tier for parameters. Standard parameters have a content size limit of 4 KB and can't be configured to use parameter policies. You can create a maximum of 10,000 standard parameters for each Region in an AWS account. Standard parameters are offered at no additional cost.
   * - Advanced parameters have a content size limit of 8 KB and can be configured to use parameter policies. You can create a maximum of 100,000 advanced parameters for each Region in an AWS account. Advanced parameters incur a charge. For more information, see Standard and advanced parameter tiers in the AWS Systems Manager User Guide.
   * - You can change a standard parameter to an advanced parameter any time. But you can't revert an advanced parameter to a standard parameter. Reverting an advanced parameter to a standard parameter would result in data loss because the system would truncate the size of the parameter from 8 KB to 4 KB. Reverting would also remove any policies attached to the parameter. Lastly, advanced parameters use a different form of encryption than standard parameters.
   * - If you no longer need an advanced parameter, or if you no longer want to incur charges for an advanced parameter, you must delete it and recreate it as a new standard parameter.
   *
   * @default
   * ParameterTier.STANDARD
   *
   * @example
   * ParameterTier.ADVANCED
   *
   * @example
   * ParameterTier.INTELLIGENT_TIERING
   */
  readonly parameterTier?: ssm.ParameterTier;

  /**
   * The type of SSM Parameter that you want to add.
   *
   * @default
   * ParameterType.STRING
   *
   * @example
   * ParameterType.SECURE_STRING
   *
   * @example
   * ParameterType.STRING_LIST
   */
  readonly parameterType?: ssm.ParameterType;

  /**
   * Tags to add into the SSM Paramater that you want to add.
   *
   * @todo This might be incorrect type
   *
   * @example
   * [
   *   {
   *     Key: 'STRING_VALUE',
   *     Value: 'STRING_VALUE'
   *   },
   * ]
   */
  readonly tags?: TagPropList;

  /**
   * One or more policies to apply to a SSM Parameter.
   *
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html#putParameter-property
   * @see https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html
   */
  readonly policies?: string;
}

/** List of Tag properties applied to resulting SSM Parameter. */
export type TagPropList = TagProp[];

/** Tag properties. */
export interface TagProp {
  readonly key: string;
  readonly value: string;
}
