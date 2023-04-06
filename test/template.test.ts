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
    Runtime: 'nodejs18.x',
    Handler: 'index.createPostHandler',
    TracingConfig: {
      Mode: 'Active',
    },
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-get-post-${StackConfig.environment}`,
    Runtime: 'nodejs18.x',
    Handler: 'index.getPostHandler',
    TracingConfig: {
      Mode: 'Active',
    },
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-delete-post-${StackConfig.environment}`,
    Runtime: 'nodejs18.x',
    Handler: 'index.deletePostHandler',
    TracingConfig: {
      Mode: 'Active',
    },
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-update-post-${StackConfig.environment}`,
    Runtime: 'nodejs18.x',
    Handler: 'index.updatePostHandler',
    TracingConfig: {
      Mode: 'Active',
    },
  });

  template.resourceCountIs('AWS::Lambda::Function', 4);
});

test('Rest API Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new TemplateStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: `${StackConfig.name}-api-gateway-${StackConfig.environment}`,
    EndpointConfiguration: {
      Types: ['REGIONAL'],
    },
  });

  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
});

test('DynamoDB Table Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new TemplateStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::DynamoDB::Table', {
    TableName: `${StackConfig.name}-post-table-${StackConfig.environment}`,
    BillingMode: 'PAY_PER_REQUEST',
  });

  template.resourceCountIs('AWS::DynamoDB::Table', 1);
});
