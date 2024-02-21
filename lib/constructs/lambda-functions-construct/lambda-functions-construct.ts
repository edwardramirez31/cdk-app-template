import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { StackConfig } from '../../config/stack-configuration';

import type { LambdaConstructsProperties } from './interfaces';

export default class LambdaFunctionsConstruct extends Construct {
  public readonly createUserFunction: NodejsFunction;
  public readonly getUserFunction: NodejsFunction;
  public readonly updateUserFunction: NodejsFunction;
  // public readonly deleteUserFunction: NodejsFunction;
  private readonly dynamoTableName: string;

  constructor(scope: Construct, id: string, properties: LambdaConstructsProperties) {
    super(scope, id);
    this.dynamoTableName = `${StackConfig.name}-user-table-${StackConfig.environment}`;

    this.createUserFunction = new NodejsFunction(this, `${StackConfig.name}-create-user-${StackConfig.environment}`, {
      entry: './src/functions/create-user/handler.ts',
      handler: 'createUserHandler',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
        USERS_TABLE_NAME: this.dynamoTableName,
      },
      functionName: `${StackConfig.name}-create-user-${StackConfig.environment}`,
    });

    this.getUserFunction = new NodejsFunction(this, `${StackConfig.name}-get-user-${StackConfig.environment}`, {
      entry: './src/functions/get-user/handler.ts',
      handler: 'getUserHandler',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
        USERS_TABLE_NAME: this.dynamoTableName,
      },
      functionName: `${StackConfig.name}-get-user-${StackConfig.environment}`,
    });

    this.updateUserFunction = new NodejsFunction(this, `${StackConfig.name}-update-user-${StackConfig.environment}`, {
      entry: './src/functions/update-user/handler.ts',
      handler: 'updateUserHandler',
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      environment: {
        PINO_LEVEL: properties.level,
        USERS_TABLE_NAME: this.dynamoTableName,
      },
      functionName: `${StackConfig.name}-update-user-${StackConfig.environment}`,
    });

    // this.deleteUserFunction = new NodejsFunction(this, `${StackConfig.name}-delete-user-${StackConfig.environment}`, {
    //   entry: './src/functions/delete-user/handler.ts',
    //   handler: 'deleteUserHandler',
    //   runtime: Runtime.NODEJS_18_X,
    //   tracing: Tracing.ACTIVE,
    //   environment: {
    //     PINO_LEVEL: properties.level,
    //     USERS_TABLE_NAME: this.dynamoTableName,
    //   },
    //   functionName: `${StackConfig.name}-delete-user-${StackConfig.environment}`,
    // });
  }
}
