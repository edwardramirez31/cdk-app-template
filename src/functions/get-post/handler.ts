import type { APIGatewayProxyHandler } from 'aws-lambda';

import { getLogger } from '../../utils/logger';
import { responseGenerator } from '../../utils/response-generator';

import { getPostByIdFromDynamoDB } from './utils';

export const getPostHandler: APIGatewayProxyHandler = async (event, context) => {
  const logger = getLogger();
  logger.info(event, 'Event received');
  logger.info(context, 'Context received');
  logger.info(process.env, 'Environment received');

  const id = event.pathParameters?.id;

  if (!id) {
    return responseGenerator({ statusCode: 400, body: { message: 'post id should be present' } });
  }

  const post = await getPostByIdFromDynamoDB(id);

  if (!post) {
    return responseGenerator({ statusCode: 404, body: { message: 'post not found' } });
  }

  return responseGenerator({
    statusCode: 200,
    body: {
      item: { ...post },
    },
  });
};
