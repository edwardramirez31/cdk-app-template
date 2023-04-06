import type { APIGatewayProxyResult, Context } from 'aws-lambda';
import type { ObjectSchema } from 'joi';

import type { GatewayProxyEvent } from '../decorators/types';
import { BackendError } from '../models/error';
import { getLogger } from '../utils/logger';

export const handleValidation = async <T>(
  event: GatewayProxyEvent<T>,
  context: Context,
  schema: ObjectSchema,
  responseFunction: (event: GatewayProxyEvent<T>, context: Context) => Promise<APIGatewayProxyResult>,
): Promise<APIGatewayProxyResult> => {
  const logger = getLogger();
  const { error } = schema.validate(event.body);
  if (error) {
    logger.error({ error }, 'Validation problems');
    throw new BackendError(400, 'Validation problems', {
      message: 'request validation error',
      errors: error.details.map((item) => ({
        field: item.path,
        message: item.message,
        type: item.type,
      })),
    });
  }

  return await responseFunction(event, context);
};
