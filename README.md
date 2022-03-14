# ![Alma CDK Cross-Region Parameter](/assets/alma-cdk-project-target.png)

![CDK Version](https://img.shields.io/badge/CDK-v2-informational "CDK v2")
![Stability](https://img.shields.io/badge/Stability-Experimental-yellow "Stability: Experimental")

**Store SSM Parameter into another AWS Region with CDK**



<br/>

## Important

**🚧 This tool is work-in-progress and experimental!**

All `@almamedia-open-source/cdk-` prefixed constructs/utilities are based on existing CDK constructs/utilities we've developed & used (in production) internally at [Alma Media](https://www.almamedia.fi/en/) since 2019.

_Breaking changes may occur at any given time without prior warning before first `v1` major is released_, as we rewrite them for CDK v2 and use this opportunity to also redesign & refactor.

[Feedback](https://github.com/almamedia-open-source/cdk-cross-region-parameter/issues) is most welcome, but do note that we intend to implement these new constructs/utilities and their APIs in such manner that our existing CDK v1 production workloads can easily migrate into these new `@almamedia-open-source/cdk-` constructs/utilities.

<br/>

## Overview

`CrossRegionParameter` CDK construct allows you to store SSM Parameters to another region

<br/>

## Installation

1. Ensure you meet following requirements:
    - [NodeJS](https://nodejs.org/en/) `v14.17.6` or newer
    - [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) `v2.0.0` or newer

2. Install this tool:
    ```shell
    npm i -D @almamedia-open-source/cdk-cross-region-parameter
    ```

<br/>

## Usage

```ts
import { CrossRegionParameter } from "@almamedia-open-source/cdk-cross-region-parameter";

new CrossRegionParameter(this, "SayHiToSweden", {
  region: "eu-north-1",
  name: "/parameter/path/message",
  description: "Some message for the Swedes!",
  value: "Hej då!",
});
```

<br/><br/>