import * as cdk from 'aws-cdk-lib';
import type { StackProps } from 'aws-cdk-lib';
import type { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import type { Construct } from 'constructs';

import ApisConstruct from './constructs/apis-construct/apis-construct';
import { DynamoDatabasesConstruct } from './constructs/dynamo-databases-construct/dynamo-databases-construct';
import LambdaFunctionsConstruct from './constructs/lambda-functions-construct/lambda-functions-construct';

export class TemplateStack extends cdk.Stack {
  private lambdaConstruct: LambdaFunctionsConstruct;

  constructor(scope: Construct, id: string, properties?: StackProps) {
    super(scope, id, properties);

    this.lambdaConstruct = new LambdaFunctionsConstruct(this, 'LambdaFunctionsConstruct', {
      level: 'info',
    });

    new DynamoDatabasesConstruct(this, 'DynamoDatabasesConstruct', {
      lambdaConstruct: this.lambdaConstruct,
    });

    const restApiConstruct = new ApisConstruct(this, 'ApisConstruct');

    this.setApiEvents(restApiConstruct.apiGateway);
  }

  private setApiEvents(api: RestApi): void {
    const prefix = api.root.addResource('v1');
    const route1 = prefix.addResource('post');
    const createPostIntegration = new LambdaIntegration(this.lambdaConstruct.createPostFunction);
    route1.addMethod('POST', createPostIntegration);

    const route2 = route1.addResource('{id}');
    const getPostIntegration = new LambdaIntegration(this.lambdaConstruct.getPostFunction);
    route2.addMethod('GET', getPostIntegration);
    const updatePostIntegration = new LambdaIntegration(this.lambdaConstruct.updatePostFunction);
    route2.addMethod('PUT', updatePostIntegration);
    const deletePostIntegration = new LambdaIntegration(this.lambdaConstruct.deletePostFunction);
    route2.addMethod('DELETE', deletePostIntegration);
  }
}
