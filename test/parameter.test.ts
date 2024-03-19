import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CrossRegionParameter } from '../src/parameter';

process.env.ENVIRONMENT = 'test';

test('Basic usage', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new CrossRegionParameter(stack, 'SayHiToSweden', {
    region: 'eu-north-1',
    name: '/parameter/path/message',
    description: 'Some message for the Swedes!',
    value: 'Hej då!',
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'ssm:PutParameter',
            'ssm:DeleteParameter',
            'ssm:AddTagsToResource',
          ],
          Effect: 'Allow',
          Resource: {
            'Fn::Join': [
              '',
              [
                'arn:aws:ssm:eu-north-1:',
                {
                  Ref: 'AWS::AccountId',
                },
                ':parameter*',
              ],
            ],
          },
          Condition: {
            StringEquals: {
              'aws:ResourceTag/@alma-cdk/cross-region-parameter:fromConstruct': 'TestStack/SayHiToSweden',
            },
          },
        },
      ],
    },
  });

});
