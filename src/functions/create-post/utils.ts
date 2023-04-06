// set function to create post in dynamoDB
// get tablename from environment variables
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import type { Post } from '../get-post/types';

export const createPostInDynamoDB = async (post: Post): Promise<void> => {
  const documentClient = new DocumentClient();

  const parameters = {
    TableName: process.env.POSTS_TABLE_NAME || '',
    Item: {
      ...post,
    },
  };

  await documentClient.put(parameters).promise();
};
