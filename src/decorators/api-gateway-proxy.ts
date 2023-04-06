import type { APIGatewayProxyHandler, Context, APIGatewayProxyResult } from 'aws-lambda';

import { BackendError } from '../models/error';
import { getLogger } from '../utils/logger';
import { responseGenerator } from '../utils/response-generator';
import { handleValidation } from '../validators/handle-validation';

import type { ApiGwProxyParameters, Event } from './types';
import { eventBodyParser } from './utils';

export const apiGwProxy =
  <TEventBody = null>({ handler, schema }: ApiGwProxyParameters<TEventBody>): APIGatewayProxyHandler =>
  async (event: Event, context: Context): Promise<APIGatewayProxyResult> => {
    const logger = getLogger();
    try {
      const mqGatewayProxyEvent = eventBodyParser<TEventBody>(event);

      const result = await (schema
        ? handleValidation(mqGatewayProxyEvent, context, schema, handler)
        : handler(mqGatewayProxyEvent, context));

      return result;
    } catch (error) {
      if (error instanceof BackendError) {
        logger.error(error, error.message);
        return responseGenerator({
          statusCode: error.status,
          body: error.body,
        });
      } else {
        logger.error(error, 'Error occurred');
        return responseGenerator({
          // @ts-ignore
          statusCode: error?.statusCode || 500,
          body: {
            // @ts-ignore
            errorMessage: error?.message || 'Something went wrong',
            // @ts-ignore
            code: error?.code || 'Unknown',
          },
        });
      }
    }
  };
