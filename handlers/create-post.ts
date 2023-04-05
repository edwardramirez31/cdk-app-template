import type { APIGatewayProxyHandler } from 'aws-lambda';

import { getLogger } from '../utils/logger';

export const handler: APIGatewayProxyHandler = (event, context, callback) => {
  const logger = getLogger();
  logger.info(event, 'Event received');
  logger.info(context, 'Context received');
  logger.info(process.env, 'Environment received');
  callback(undefined, { statusCode: 201, body: JSON.stringify({ message: 'post created' }) });
};
