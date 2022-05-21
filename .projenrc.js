const { awscdk, TextFile, javascript } = require('projen');

const nodejsVersion = '14.17.6';

const project = new awscdk.AwsCdkConstructLibrary({

  // Metadata
  stability: 'experimental',
  authorName: 'Alma Media',
  authorOrganization: true,
  authorAddress: 'opensource@almamedia.dev',
  name: '@alma-cdk/cross-region-parameter',
  description: 'Store AWS SSM Parameter Store Parameters into another AWS Region with AWS CDK',
  repositoryUrl: 'https://github.com/alma-cdk/cross-region-parameter.git',
  keywords: ['cdk', 'aws-cdk', 'awscdk', 'aws', 'cross-region', 'ssm', 'parameter'],

  // Publish configuration
  defaultReleaseBranch: 'main',
  packageManager: javascript.NodePackageManager.NPM,
  npmAccess: javascript.NpmAccess.PUBLIC,

  // Dependencies
  minNodeVersion: nodejsVersion,
  cdkVersion: '2.24.1',
  constructsVersion: '10.0.0',
  peerDeps: [
    'constructs',
    'aws-cdk-lib',
  ],
  devDeps: [
    'constructs',
    'aws-cdk-lib',
    'aws-sdk',
    '@types/prettier@v2.6.0',
    '@types/change-case',
  ],
  bundledDeps: [
    'aws-sdk',
    'change-case',
  ],

  // Gitignore
  gitignore: [
    '.DS_Store',
    '/examples/**/cdk.context.json',
    '/examples/**/node_modules',
    '/examples/**/cdk.out',
    '/examples/**/.git',
  ],


});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});

project.addPackageIgnore('/examples/');


project.synth();
