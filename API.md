# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CrossRegionParameter <a name="CrossRegionParameter" id="@alma-cdk/cross-region-parameter.CrossRegionParameter"></a>

#### Initializers <a name="Initializers" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer"></a>

```typescript
import { CrossRegionParameter } from '@alma-cdk/cross-region-parameter'

new CrossRegionParameter(scope: Construct, name: string, props: CrossRegionParameterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.props">props</a></code> | <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps">CrossRegionParameterProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.props"></a>

- *Type:* <a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps">CrossRegionParameterProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.isConstruct"></a>

```typescript
import { CrossRegionParameter } from '@alma-cdk/cross-region-parameter'

CrossRegionParameter.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### CrossRegionParameterProps <a name="CrossRegionParameterProps" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps"></a>

#### Initializer <a name="Initializer" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.Initializer"></a>

```typescript
import { CrossRegionParameterProps } from '@alma-cdk/cross-region-parameter'

const crossRegionParameterProps: CrossRegionParameterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.description">description</a></code> | <code>string</code> | Information about the SSM Parameter that you want to add. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.name">name</a></code> | <code>string</code> | SSM Parameter name. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.region">region</a></code> | <code>string</code> | Target region for the parameter. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.value">value</a></code> | <code>string</code> | The SSM Parameter value that you want to add. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.allowedPattern">allowedPattern</a></code> | <code>string</code> | A regular expression used to validate the SSM Parameter Value. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.keyId">keyId</a></code> | <code>string</code> | The AWS Key Management Service (AWS KMS) ID that you want to use to encrypt a parameter. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.parameterTier">parameterTier</a></code> | <code>aws-cdk-lib.aws_ssm.ParameterTier</code> | The SSM Parameter Tier to assign to a parameter. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.parameterType">parameterType</a></code> | <code>aws-cdk-lib.aws_ssm.ParameterType</code> | The type of SSM Parameter that you want to add. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.policies">policies</a></code> | <code>string</code> | One or more policies to apply to a SSM Parameter. |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.tags">tags</a></code> | <code><a href="#@alma-cdk/cross-region-parameter.TagProp">TagProp</a>[]</code> | Tags to add into the SSM Paramater that you want to add. |

---

##### `description`<sup>Required</sup> <a name="description" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Information about the SSM Parameter that you want to add.

Required by this construct (AWS considers it as optional).

---

*Example*

```typescript
'Some message for the Swedes'
```


##### `name`<sup>Required</sup> <a name="name" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

SSM Parameter name.

---

*Example*

```typescript
'/parameter/path/message'
```


##### `region`<sup>Required</sup> <a name="region" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

Target region for the parameter.

Must be some other region than the current Stack's region.

---

*Example*

```typescript
'eu-north-1'
```


##### `value`<sup>Required</sup> <a name="value" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

The SSM Parameter value that you want to add.

Limits:
- Standard parameters have a value limit of 4 KB.
- Advanced parameters have a value limit of 8 KB.

---

*Example*

```typescript
'Hej då!'
```


##### `allowedPattern`<sup>Optional</sup> <a name="allowedPattern" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.allowedPattern"></a>

```typescript
public readonly allowedPattern: string;
```

- *Type:* string

A regular expression used to validate the SSM Parameter Value.

For example, for String types with values restricted to numbers,
you can specify the following: `^\d+$`.

> [https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_PutParameter.html#systemsmanager-PutParameter-request-AllowedPattern](https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_PutParameter.html#systemsmanager-PutParameter-request-AllowedPattern)

---

*Example*

```typescript
'^\d+$'
```


##### `keyId`<sup>Optional</sup> <a name="keyId" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.keyId"></a>

```typescript
public readonly keyId: string;
```

- *Type:* string

The AWS Key Management Service (AWS KMS) ID that you want to use to encrypt a parameter.

Either the default AWS KMS key automatically assigned to your AWS account or a custom key. Required for parameters that use the SecureString data type.

The KMS Key must exists in the target region.

If you don't specify a key ID, the system uses the default key associated with your AWS account.

> [https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_PutParameter.html#systemsmanager-PutParameter-request-KeyId](https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_PutParameter.html#systemsmanager-PutParameter-request-KeyId)

---

*Example*

```typescript
'1234abcd-12ab-34cd-56ef-1234567890ab'
```


##### `parameterTier`<sup>Optional</sup> <a name="parameterTier" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.parameterTier"></a>

```typescript
public readonly parameterTier: ParameterTier;
```

- *Type:* aws-cdk-lib.aws_ssm.ParameterTier
- *Default:* ParameterTier.STANDARD

The SSM Parameter Tier to assign to a parameter.

Parameter Store offers a standard tier and an advanced tier for parameters. Standard parameters have a content size limit of 4 KB and can't be configured to use parameter policies. You can create a maximum of 10,000 standard parameters for each Region in an AWS account. Standard parameters are offered at no additional cost.
- Advanced parameters have a content size limit of 8 KB and can be configured to use parameter policies. You can create a maximum of 100,000 advanced parameters for each Region in an AWS account. Advanced parameters incur a charge. For more information, see Standard and advanced parameter tiers in the AWS Systems Manager User Guide.
- You can change a standard parameter to an advanced parameter any time. But you can't revert an advanced parameter to a standard parameter. Reverting an advanced parameter to a standard parameter would result in data loss because the system would truncate the size of the parameter from 8 KB to 4 KB. Reverting would also remove any policies attached to the parameter. Lastly, advanced parameters use a different form of encryption than standard parameters.
- If you no longer need an advanced parameter, or if you no longer want to incur charges for an advanced parameter, you must delete it and recreate it as a new standard parameter.

---

*Example*

```typescript
ParameterTier.INTELLIGENT_TIERING
```


##### `parameterType`<sup>Optional</sup> <a name="parameterType" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.parameterType"></a>

```typescript
public readonly parameterType: ParameterType;
```

- *Type:* aws-cdk-lib.aws_ssm.ParameterType
- *Default:* ParameterType.STRING

The type of SSM Parameter that you want to add.

---

*Example*

```typescript
ParameterType.STRING_LIST
```


##### `policies`<sup>Optional</sup> <a name="policies" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.policies"></a>

```typescript
public readonly policies: string;
```

- *Type:* string

One or more policies to apply to a SSM Parameter.

> [https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html)

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@alma-cdk/cross-region-parameter.CrossRegionParameterProps.property.tags"></a>

```typescript
public readonly tags: TagProp[];
```

- *Type:* <a href="#@alma-cdk/cross-region-parameter.TagProp">TagProp</a>[]

Tags to add into the SSM Paramater that you want to add.

---

*Example*

```typescript
[
  {
    Key: 'STRING_VALUE',
    Value: 'STRING_VALUE'
  },
]
```


### TagProp <a name="TagProp" id="@alma-cdk/cross-region-parameter.TagProp"></a>

Tag properties.

#### Initializer <a name="Initializer" id="@alma-cdk/cross-region-parameter.TagProp.Initializer"></a>

```typescript
import { TagProp } from '@alma-cdk/cross-region-parameter'

const tagProp: TagProp = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.TagProp.property.key">key</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.TagProp.property.value">value</a></code> | <code>string</code> | *No description.* |

---

##### `key`<sup>Required</sup> <a name="key" id="@alma-cdk/cross-region-parameter.TagProp.property.key"></a>

```typescript
public readonly key: string;
```

- *Type:* string

---

##### `value`<sup>Required</sup> <a name="value" id="@alma-cdk/cross-region-parameter.TagProp.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

---



