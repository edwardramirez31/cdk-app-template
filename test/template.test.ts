import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { StackConfig } from '../lib/config/stack-configuration';
import { TemplateStack } from '../lib/template-stack';

test('Lambda Functions Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new TemplateStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-create-post-${StackConfig.environment}`,
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-get-post-${StackConfig.environment}`,
  });

  template.resourceCountIs('AWS::Lambda::Function', 2);
});
