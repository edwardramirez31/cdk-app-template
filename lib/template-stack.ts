import * as cdk from 'aws-cdk-lib';
import type { StackProps } from 'aws-cdk-lib';
import type { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import type { Construct } from 'constructs';

import ApisConstruct from './constructs/apis-construct/apis-construct';
import { DynamoDatabasesConstruct } from './constructs/dynamo-databases-construct/dynamo-databases-construct';
import LambdaFunctionsConstruct from './constructs/lambda-functions-construct/lambda-functions-construct';

export class PulsoPolarStack extends cdk.Stack {
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
    const route1 = prefix.addResource('user');
    const createUserIntegration = new LambdaIntegration(this.lambdaConstruct.createUserFunction);
    route1.addMethod('POST', createUserIntegration);

    const route2 = route1.addResource('{id}');
    const getUserIntegration = new LambdaIntegration(this.lambdaConstruct.getUserFunction);
    route2.addMethod('GET', getUserIntegration);
    // const updateUserIntegration = new LambdaIntegration(this.lambdaConstruct.updateUserFunction);
    // route2.addMethod('PUT', updateUserIntegration);
    // const deleteUserIntegration = new LambdaIntegration(this.lambdaConstruct.deleteUserFunction);
    // route2.addMethod('DELETE', deleteUserIntegration);
  }
}
