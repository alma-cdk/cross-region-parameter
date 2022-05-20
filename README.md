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

## Work in Progress

![experimental](https://img.shields.io/badge/stability-experimental-yellow "Stability: Experimental")

🚧 &nbsp;**Do not use for production critial stuff! This construct is still very much work in progress and breaking changes may occur.** 🚧


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
