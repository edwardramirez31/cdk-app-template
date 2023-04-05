import type { StackProps } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import type { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import type { Construct } from 'constructs';

import ApisConstruct from './constructs/apis-construct/apis-construct';
import LambdaFunctionsConstruct from './constructs/lambda-functions-construct/lambda-functions-construct';

export class WorkshopStack extends Stack {
  private lambdaConstruct: LambdaFunctionsConstruct;

  constructor(scope: Construct, id: string, properties?: StackProps) {
    super(scope, id, properties);

    this.lambdaConstruct = new LambdaFunctionsConstruct(scope, 'LambdaFunctionsConstruct', {
      level: 'info',
    });

    const restApiConstruct = new ApisConstruct(scope, 'ApisConstruct');

    this.setApiEvents(restApiConstruct.apiGateway);
  }

  private setApiEvents(api: RestApi): void {
    const prefix = api.root.addResource('v1');
    const route1 = prefix.addResource('post');
    const integration1 = new LambdaIntegration(this.lambdaConstruct.createPostFunction);
    route1.addMethod('POST', integration1);

    const route2 = prefix.addResource('post').addResource('{id}');
    const integration2 = new LambdaIntegration(this.lambdaConstruct.getPostFunction);
    route2.addMethod('GET', integration2);
  }
}
