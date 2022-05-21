<div align="center">
	<br/>
	<br/>
  <h1>
	<img height="140" src="assets/alma-cdk-cross-region-parameter.svg" alt="Alma CDK Cross-Region Parameter" />
  <br/>
  <br/>
  </h1>

  ```sh
  npm i -D @alma-cdk/cross-region-parameter
  ```

  <div align="left">

  Store [AWS SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) Parameters into another AWS Region with AWS CDK.

  </div>
  <br/>
</div>


<br/>

<div align="center">

![diagram](assets/diagram.svg)

</div>

<br/>

## 🚧 &nbsp; Project Stability

![experimental](https://img.shields.io/badge/stability-experimental-yellow "Stability: Experimental")

This construct is still versioned with `v0` major version and breaking changes might be introduced if necessary (without a major version bump), though we aim to keep the API as stable as possible (even within `v0` development). We aim to publish `v1.0.0` soon and after that breaking changes will be introduced via major version bumps.


<br/>

## Getting Started

```ts
import { CrossRegionParameter } from "@alma-cdk/cross-region-parameter";

new CrossRegionParameter(this, 'SayHiToSweden', {
  region: 'eu-north-1',
  name: '/parameter/path/message',
  description: 'Some message for the Swedes',
  value: 'Hej då!',
});
```
