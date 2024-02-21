// set function to create user in dynamoDB
// get tablename from environment variables
import type { UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { getLogger } from '../../utils/logger';
import type { User } from '../get-user/types';

export const updateUserByIdInDynamoDB = async (user: Omit<User, 'createdAt'>): Promise<void> => {
  const logger = getLogger();
  const documentClient = new DocumentClient();

  const parameters: UpdateItemInput = {
    TableName: process.env.USERS_TABLE_NAME || '',
    Key: {
      username: { S: user.username },
      email: { S: user.email },
    },
    UpdateExpression: 'set #username = :username',
    ExpressionAttributeNames: {
      '#username': 'username',
    },
    ExpressionAttributeValues: {
      ':username': { S: user.username },
    },
  };

  const result = await documentClient.update(parameters).promise();
  logger.info(result);
};
