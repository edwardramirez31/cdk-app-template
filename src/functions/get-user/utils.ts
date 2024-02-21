import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import type { User } from './types';

export const getUserByIdFromDynamoDB = async (id: string): Promise<User | null> => {
  const documentClient = new DocumentClient();

  const parameters = {
    TableName: process.env.USERS_TABLE_NAME || '',
    Key: {
      username: id,
    },
  };

  const result = await documentClient.get(parameters).promise();

  if (!result.Item) {
    return null;
  }

  return result.Item as User;
};
