import type { APIGatewayProxyHandler } from 'aws-lambda';

import { getLogger } from '../../utils/logger';

import { getPostByIdFromDynamoDB } from './utils';

export const getPostHandler: APIGatewayProxyHandler = async (event, context) => {
  const logger = getLogger();
  logger.info(event, 'Event received');
  logger.info(context, 'Context received');
  logger.info(process.env, 'Environment received');

  const id = event.pathParameters?.id;

  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ message: 'post id should be present' }) };
  }

  const post = await getPostByIdFromDynamoDB(id);

  if (!post) {
    return { statusCode: 404, body: JSON.stringify({ message: 'post not found' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: { ...post },
    }),
  };
};
