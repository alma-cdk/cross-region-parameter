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
  stability: cdk.Stability.EXPERIMENTAL, // or STABLE or DEPRECATED
  majorVersion: 1,
  releaseEnvironment: "production",
  devDeps: [
    "constructs",
    "aws-cdk-lib",
    "@alma-cdk/construct-library",
    "@types/prettier@2.6.0",
  ],
  deps: ["aws-sdk"],
  bundledDeps: ["aws-sdk", "change-case"],
});

project.synth();

// new awscdk.AwsCdkConstructLibrary({

//   // Metadata
//   stability: 'experimental',
//   authorName: 'Alma Media',
//   authorOrganization: true,
//   authorAddress: 'opensource@almamedia.dev',
//   name: '@alma-cdk/cross-region-parameter',
//   description: 'Store AWS SSM Parameter Store Parameters into another AWS Region with AWS CDK',
//   repositoryUrl: 'https://github.com/alma-cdk/cross-region-parameter.git',
//   keywords: ['cdk', 'aws-cdk', 'awscdk', 'aws', 'cross-region', 'ssm', 'parameter'],

//   // Publish configuration
//   defaultReleaseBranch: 'main',
//   packageManager: javascript.NodePackageManager.NPM,
//   npmAccess: javascript.NpmAccess.PUBLIC,
//   // python: {
//   //   distName: 'alma-cdk.cross-region-parameter',
//   //   module: 'alma_cdk.cross_region_parameter',
//   // },
//   publishToGo: {
//     moduleName: 'github.com/alma-cdk/cross-region-parameter-go',
//   },
//   majorVersion: 0,
//   releaseBranches: {
//     beta: {
//       majorVersion: 1,
//       prerelease: 'beta',
//       npmDistTag: 'beta',
//     },
//   },
//   // Dependencies
//   minNodeVersion: nodejsVersion,
//   cdkVersion: '2.24.1',
//   constructsVersion: '10.0.0',
//   peerDeps: [
//     'constructs',
//     'aws-cdk-lib',
//   ],
//   devDeps: [
//     'constructs',
//     'aws-cdk-lib',
//     'aws-sdk',
//     '@types/prettier@2.6.0',
//     '@types/change-case',
//   ],
//   bundledDeps: [
//     'aws-sdk',
//     'change-case',
//   ],

//   // Gitignore
//   gitignore: [
//     '.DS_Store',
//     '/examples/**/cdk.context.json',
//     '/examples/**/node_modules',
//     '/examples/**/cdk.out',
//     '/examples/**/.git',
//   ],

// });

// new TextFile(project, '.nvmrc', {
//   lines: [nodejsVersion],
// });

// project.addPackageIgnore('/examples/');

// project.synth();
