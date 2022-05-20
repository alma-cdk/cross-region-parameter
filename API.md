# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CrossRegionParameter <a name="CrossRegionParameter" id="@alma-cdk/cross-region-parameter.CrossRegionParameter"></a>

#### Initializers <a name="Initializers" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer"></a>

```typescript
import { CrossRegionParameter } from '@alma-cdk/cross-region-parameter'

new CrossRegionParameter(scope: Construct, name: string, props: ICrossRegionParameterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.props">props</a></code> | <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps">ICrossRegionParameterProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@alma-cdk/cross-region-parameter.CrossRegionParameter.Initializer.parameter.props"></a>

- *Type:* <a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps">ICrossRegionParameterProps</a>

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




## Protocols <a name="Protocols" id="Protocols"></a>

### ICrossRegionParameterProps <a name="ICrossRegionParameterProps" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps"></a>

- *Implemented By:* <a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps">ICrossRegionParameterProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.region">region</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.value">value</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.allowedPattern">allowedPattern</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.keyId">keyId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.parameterTier">parameterTier</a></code> | <code>aws-cdk-lib.aws_ssm.ParameterTier</code> | Tier. |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.parameterType">parameterType</a></code> | <code>aws-cdk-lib.aws_ssm.ParameterType</code> | Type. |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.policies">policies</a></code> | <code>string</code> | Parameter policies. |
| <code><a href="#@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}[]</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `region`<sup>Required</sup> <a name="region" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

---

##### `value`<sup>Required</sup> <a name="value" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

---

##### `allowedPattern`<sup>Optional</sup> <a name="allowedPattern" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.allowedPattern"></a>

```typescript
public readonly allowedPattern: string;
```

- *Type:* string

---

##### `keyId`<sup>Optional</sup> <a name="keyId" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.keyId"></a>

```typescript
public readonly keyId: string;
```

- *Type:* string

---

##### `parameterTier`<sup>Optional</sup> <a name="parameterTier" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.parameterTier"></a>

```typescript
public readonly parameterTier: ParameterTier;
```

- *Type:* aws-cdk-lib.aws_ssm.ParameterTier
- *Default:* "Standard"

Tier.

---

##### `parameterType`<sup>Optional</sup> <a name="parameterType" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.parameterType"></a>

```typescript
public readonly parameterType: ParameterType;
```

- *Type:* aws-cdk-lib.aws_ssm.ParameterType
- *Default:* "String"

Type.

---

##### `policies`<sup>Optional</sup> <a name="policies" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.policies"></a>

```typescript
public readonly policies: string;
```

- *Type:* string

Parameter policies.

> [https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-policies.html)

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@alma-cdk/cross-region-parameter.ICrossRegionParameterProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string}[];
```

- *Type:* {[ key: string ]: string}[]

---

