import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { StackConfig } from '../../config/stack-configuration';

import type { LambdaConstructsProperties } from './interfaces';

export default class LambdaFunctionsConstruct extends Construct {
  public readonly createPostFunction: NodejsFunction;
  public readonly getPostFunction: NodejsFunction;
  public readonly updatePostFunction: NodejsFunction;
  public readonly deletePostFunction: NodejsFunction;

  constructor(scope: Construct, id: string, properties: LambdaConstructsProperties) {
    super(scope, id);

    this.createPostFunction = new NodejsFunction(this, 'CreatePostFunction', {
      entry: './src/functions/create-post/handler.ts',
      handler: 'createPostHandler',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
        POSTS_TABLE_NAME: `${StackConfig.name}-post-table-${StackConfig.environment}`,
      },
      functionName: `${StackConfig.name}-create-post-${StackConfig.environment}`,
    });

    this.getPostFunction = new NodejsFunction(this, 'GetPostFunction', {
      entry: './src/functions/get-post/handler.ts',
      handler: 'getPostHandler',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
        POSTS_TABLE_NAME: `${StackConfig.name}-post-table-${StackConfig.environment}`,
      },
      functionName: `${StackConfig.name}-get-post-${StackConfig.environment}`,
    });

    this.updatePostFunction = new NodejsFunction(this, 'UpdatePostFunction', {
      entry: './src/functions/update-post/handler.ts',
      handler: 'updatePostHandler',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
        POSTS_TABLE_NAME: `${StackConfig.name}-post-table-${StackConfig.environment}`,
      },
      functionName: `${StackConfig.name}-update-post-${StackConfig.environment}`,
    });

    this.deletePostFunction = new NodejsFunction(this, 'DeletePostFunction', {
      entry: './src/functions/delete-post/handler.ts',
      handler: 'deletePostHandler',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
        POSTS_TABLE_NAME: `${StackConfig.name}-post-table-${StackConfig.environment}`,
      },
      functionName: `${StackConfig.name}-delete-post-${StackConfig.environment}`,
    });
  }
}
