import { AlmaCdkConstructLibrary } from "@alma-cdk/construct-library";
import { cdk } from "projen";

const MAJOR_VERSION = 2;
const NEXT_MAJOR_VERSION = MAJOR_VERSION + 1;

const project = new AlmaCdkConstructLibrary({
  name: "@alma-cdk/cross-region-parameter",
  author: "Alma Media",
  authorAddress: "opensource@almamedia.dev",
  description:
    "Store AWS SSM Parameter Store Parameters into another AWS Region with AWS CDK",
  keywords: [
    "cdk",
    "aws-cdk",
    "awscdk",
    "aws",
    "cross-region",
    "ssm",
    "parameter",
  ],
  repositoryUrl: "https://github.com/alma-cdk/cross-region-parameter.git",
  stability: cdk.Stability.EXPERIMENTAL,
  majorVersion: MAJOR_VERSION,
  releaseEnvironment: "production",
  devDeps: [
    "constructs",
    "aws-cdk-lib",
    "@alma-cdk/construct-library",
    "@types/prettier@2.6.0",
    "@types/change-case",
    // Types only: the SDK calls are executed by the AwsCustomResource runtime,
    // which ships its own SDK. Nothing is imported at runtime, so this must not
    // become a (bundled) dependency.
    "@aws-sdk/client-ssm",
  ],
  bundledDeps: ["change-case"],
  pnpmSettings: {
    overrides: {
      // js-yaml 3.x reaches the tree only through @istanbuljs/load-nyc-config,
      // which declares ^3.13.1 but which `pnpm update` will not lift off the
      // vulnerable 3.14.2 on its own. Fixes GHSA-52cp-r559-cp3m,
      // GHSA-5p4m-2wfm-xmqj and GHSA-h67p-54hq-rp68. Scoped to 3 so that
      // eslint's js-yaml 4.x is left on its own major.
      "js-yaml@3": "^3.15.1",
    },
  },
  releaseBranches: {
    [`${NEXT_MAJOR_VERSION}.x`]: {
      majorVersion: NEXT_MAJOR_VERSION,
      prerelease: "beta",
    },
  },
});

project.synth();
