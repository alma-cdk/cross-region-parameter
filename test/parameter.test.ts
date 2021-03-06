import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CrossRegionParameter } from '../src/parameter';

process.env.ENVIRONMENT = 'test';

test('Basic usage', () => {
  const stack = new Stack();

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
                ':parameter/parameter/path/message',
              ],
            ],
          },
        },
      ],
    },
  });

});
