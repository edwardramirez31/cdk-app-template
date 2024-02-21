import type { APIGatewayProxyHandler } from 'aws-lambda';

import { getLogger } from '../../utils/logger';
import { responseGenerator } from '../../utils/response-generator';

import { getUserByIdFromDynamoDB } from './utils';

export const getUserHandler: APIGatewayProxyHandler = async (event, context) => {
  const logger = getLogger();
  logger.info(event, 'Event received');
  logger.info(context, 'Context received');
  logger.info(process.env, 'Environment received');

  const id = event.pathParameters?.id;

  if (!id) {
    return responseGenerator({ statusCode: 400, body: { message: 'user id should be present' } });
  }

  const user = await getUserByIdFromDynamoDB(id);

  if (!user) {
    return responseGenerator({ statusCode: 404, body: { message: 'user not found' } });
  }

  return responseGenerator({
    statusCode: 200,
    body: {
      item: { ...user },
    },
  });
};
