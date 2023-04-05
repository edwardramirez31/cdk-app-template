import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import type { LambdaConstructsProperties } from './interfaces';

export default class LambdaFunctionsConstruct extends Construct {
  public readonly createPostFunction: NodejsFunction;
  public readonly getPostFunction: NodejsFunction;

  constructor(scope: Construct, id: string, properties: LambdaConstructsProperties) {
    super(scope, id);

    this.createPostFunction = new NodejsFunction(scope, 'HelloFunction', {
      entry: './handlers/create-post.ts',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
      },
    });

    this.getPostFunction = new NodejsFunction(scope, 'GetItemFunction', {
      entry: './handlers/get-post.ts',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
      },
    });
  }
}
