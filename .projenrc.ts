import { AlmaCdkConstructLibrary } from "@alma-cdk/construct-library";
import { cdk } from "projen";

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
  majorVersion: 1,
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
  releaseBranches: {
    "2.x": {
      majorVersion: 2,
      prerelease: "beta",
    },
  },
});

project.synth();
