const { awscdk, TextFile, javascript } = require('projen');

const nodejsVersion = '14.17.6';

const project = new awscdk.AwsCdkConstructLibrary({

  // Metadata
  stability: 'experimental',
  authorName: 'Alma Media',
  authorOrganization: true,
  authorAddress: 'opensource@almamedia.dev',
  name: '@almamedia-open-source/cdk-cross-region-parameter',
  repositoryUrl: 'https://github.com/almamedia-open-source/cdk-project-target.git',
  keywords: ['cdk', 'aws-cdk', 'awscdk', 'aws'],

  // Publish configuration
  defaultReleaseBranch: 'main',
  npmAccess: javascript.NpmAccess.PUBLIC,

  // Dependencies
  minNodeVersion: nodejsVersion,
  cdkVersion: '2.1.0',
  constructsVersion: '10.0.0',
  peerDeps: ['constructs', 'aws-cdk-lib'],
  devDeps: ['constructs', 'aws-cdk-lib', '@types/change-case'],
  bundledDeps: ['change-case'],

  // Gitignore
  gitignore: ['.DS_Store'],
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});

project.synth();