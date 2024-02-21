import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { StackConfig } from '../lib/config/stack-configuration';
import { PulsoPolarStack } from '../lib/template-stack';

test('Lambda Functions Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PulsoPolarStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-create-user-${StackConfig.environment}`,
    Runtime: 'nodejs18.x',
    Handler: 'index.createUserHandler',
    TracingConfig: {
      Mode: 'Active',
    },
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-get-user-${StackConfig.environment}`,
    Runtime: 'nodejs18.x',
    Handler: 'index.getUserHandler',
    TracingConfig: {
      Mode: 'Active',
    },
  });

  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: `${StackConfig.name}-update-user-${StackConfig.environment}`,
    Runtime: 'nodejs18.x',
    Handler: 'index.updateUserHandler',
    TracingConfig: {
      Mode: 'Active',
    },
  });

  template.resourceCountIs('AWS::Lambda::Function', 3);
});

test('Rest API Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PulsoPolarStack(app, 'MyTestStack');
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
  const stack = new PulsoPolarStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::DynamoDB::Table', {
    TableName: `${StackConfig.name}-user-table-${StackConfig.environment}`,
    BillingMode: 'PAY_PER_REQUEST',
  });

  template.resourceCountIs('AWS::DynamoDB::Table', 1);
});
