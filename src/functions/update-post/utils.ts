// set function to create post in dynamoDB
// get tablename from environment variables
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { getLogger } from '../../utils/logger';
import type { Post } from '../get-post/types';

export const updatePostByIdInDynamoDB = async (post: Omit<Post, 'createdAt'>): Promise<void> => {
  const logger = getLogger();
  const documentClient = new DocumentClient();

  const parameters = {
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      id: post.id,
    },
    UpdateExpression: 'set #body = :body',
    ExpressionAttributeNames: {
      '#body': 'body',
    },
    ExpressionAttributeValues: {
      ':body': post.body,
    },
  };

  const result = await documentClient.update(parameters).promise();
  logger.info(result);
};
