import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import type { Post } from './types';

export const getPostByIdFromDynamoDB = async (id: string): Promise<Post | null> => {
  const documentClient = new DocumentClient();

  const parameters = {
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      id,
    },
  };

  const result = await documentClient.get(parameters).promise();

  if (!result.Item) {
    return null;
  }

  return result.Item as Post;
};
