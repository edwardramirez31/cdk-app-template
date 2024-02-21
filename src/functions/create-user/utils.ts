// set function to create User in dynamoDB
// get tablename from environment variables
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import type { User } from '../get-user/types';

export const createUserInDynamoDB = async (user: User): Promise<void> => {
  const documentClient = new DocumentClient();

  const parameters = {
    TableName: process.env.USERS_TABLE_NAME || '',
    Item: {
      ...user,
    },
  };

  await documentClient.put(parameters).promise();
};
