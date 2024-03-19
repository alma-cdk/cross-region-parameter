import { TextFile, awscdk, javascript } from 'projen';
import { WorkflowSteps } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';

const project = new awscdk.AwsCdkConstructLibrary({
  projenrcTs: true,
  jsiiVersion: '~5.3.24',
  // Metadata
  stability: 'experimental',
  author: 'Alma Media',
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
  python: {
    distName: 'alma-cdk.cross-region-parameter',
    module: 'alma_cdk.cross_region_parameter',
  },
  publishToGo: {
    moduleName: 'github.com/alma-cdk/cross-region-parameter-go',
  },
  majorVersion: 0,
  releaseBranches: {
    beta: {
      majorVersion: 1,
      prerelease: 'beta',
      npmDistTag: 'beta',
    },
  },
  // Dependencies
  cdkVersion: '2.133.0',
  constructsVersion: '10.3.0',
  devDeps: [
    '@types/prettier@2.6.0',
    '@types/change-case',
  ],
  bundledDeps: [
    '@aws-sdk/client-ssm',
    'change-case',
    'ts-deepmerge',
  ],

  // Gitignore
  gitignore: [
    '.scannerwork/',
    '.DS_Store',
    '/examples/**/cdk.context.json',
    '/examples/**/node_modules',
    '/examples/**/cdk.out',
    '/examples/**/.git',
  ],


});

project.addPackageIgnore('/examples/');

/**
 * Sonarcloud report workflow
 */
const sonarCloudReportWorkflow = project.github?.addWorkflow('sonarcloud-report');
sonarCloudReportWorkflow?.on({
  push: { branches: ['main', 'beta'] },
  pullRequest: {
    types: ['opened', 'synchronize', 'reopened'],
  },
});
sonarCloudReportWorkflow?.addJob('sonarcloud-report', {
  runsOn: ['ubuntu-latest'],
  tools: {
    node: {
      version: project.minNodeVersion!,
    },
  },
  permissions: {
    contents: JobPermission.READ,
  },
  steps: [
    WorkflowSteps.checkout({
      with: {
        fetchDepth: 0,
      },
    }),
    ...project.renderWorkflowSetup(),
    {
      name: 'Run tests',
      run: 'npm run test',
    },
    {
      name: 'SonarCloud Scan',
      uses: 'SonarSource/sonarcloud-github-action@v2',
      env: {
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
        SONAR_TOKEN: '${{ secrets.SONAR_TOKEN }}',
      },
    },
  ],
});

/**
 * Sonarcloud properties file
 */
new TextFile(project, 'sonar-project.properties', {
  lines: [
    'sonar.host.url=https://sonarcloud.io',
    `sonar.projectKey=${project.name.replace('@', '').replace('/', '_')}`,
    `sonar.organization=${project.name.replace('@', '').split('/')[0]}`,
    'sonar.javascript.lcov.reportPaths=./coverage/lcov.info',
    'sonar.sources=./src',
    'sonar.tests=./test',
  ],
});

project.synth();
