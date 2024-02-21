import { Table, BillingMode, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { StackConfig } from '../../config/stack-configuration';
import type LambdaFunctionsConstruct from '../lambda-functions-construct/lambda-functions-construct';

interface DynamoDatabasesConstructProperties {
  lambdaConstruct: LambdaFunctionsConstruct;
}

export class DynamoDatabasesConstruct extends Construct {
  public readonly usersTable: Table;

  constructor(scope: Construct, id: string, properties: DynamoDatabasesConstructProperties) {
    super(scope, id);

    this.usersTable = new Table(this, 'UserTable', {
      partitionKey: {
        name: 'username',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'email',
        type: AttributeType.STRING,
      },
      tableName: `${StackConfig.name}-user-table-${StackConfig.environment}`,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.usersTable.grantReadWriteData(properties.lambdaConstruct.createUserFunction);
    this.usersTable.grantReadData(properties.lambdaConstruct.getUserFunction);
    this.usersTable.grantReadWriteData(properties.lambdaConstruct.updateUserFunction);
    // this.usersTable.grantReadWriteData(properties.lambdaConstruct.deleteUserFunction);
  }
}
