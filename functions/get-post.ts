import type { APIGatewayProxyHandler } from 'aws-lambda';

// import { getLogger } from '../utils/logger';

export const handler: APIGatewayProxyHandler = (event, _context, callback) => {
  // const logger = getLogger();
  // logger.info(event, 'Event received');
  // logger.info(context, 'Context received');
  // logger.info(process.env, 'Environment received');
  callback(undefined, {
    statusCode: 200,
    body: JSON.stringify({
      item: { id: event.pathParameters?.id || 'without id', body: 'Lorem Ipsum' },
    }),
  });
};
