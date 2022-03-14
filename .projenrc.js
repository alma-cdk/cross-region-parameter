const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'joni3k',
  authorAddress: 'joni.korpisalo@almamedia.fi',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-cross-region-parameter',
  repositoryUrl: 'https://github.com/almamedia-open-source/cdk-cross-region-parameter',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();