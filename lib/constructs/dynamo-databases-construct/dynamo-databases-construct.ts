import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { StackConfig } from '../../config/stack-configuration';
import type LambdaFunctionsConstruct from '../lambda-functions-construct/lambda-functions-construct';

interface DynamoDatabasesConstructProperties {
  lambdaConstruct: LambdaFunctionsConstruct;
}

export class DynamoDatabasesConstruct extends Construct {
  public readonly postTable: Table;

  constructor(scope: Construct, id: string, properties: DynamoDatabasesConstructProperties) {
    super(scope, id);

    this.postTable = new Table(this, 'PostTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      // sortKey: {
      //   name: 'createdAt',
      //   type: AttributeType.NUMBER,
      // },
      tableName: `${StackConfig.name}-post-table-${StackConfig.environment}`,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.postTable.grantReadWriteData(properties.lambdaConstruct.createPostFunction);
    this.postTable.grantReadData(properties.lambdaConstruct.getPostFunction);
    this.postTable.grantReadWriteData(properties.lambdaConstruct.updatePostFunction);
    this.postTable.grantReadWriteData(properties.lambdaConstruct.deletePostFunction);
  }
}
