import { apiGwProxy } from '../../decorators/api-gateway-proxy';
import { BackendError } from '../../models/error';
import { getLogger } from '../../utils/logger';
import { responseGenerator } from '../../utils/response-generator';
import { updateUserSchema } from '../../validators/schemas/user';
import type { User } from '../get-user/types';

import { updateUserByIdInDynamoDB } from './utils';

export const updateUserHandler = apiGwProxy<Omit<User, 'createdAt' | 'id'>>({
  schema: updateUserSchema,
  handler: async (event, context) => {
    const logger = getLogger();
    logger.info(event, 'Event received');
    logger.info(context, 'Context received');
    logger.info(process.env, 'Environment received');

    const id = event.pathParameters?.id;

    if (!id) {
      throw new BackendError(400, 'path parameter not found', { message: 'user id is required' });
    }

    const user = event.body!;

    await updateUserByIdInDynamoDB(user);

    return responseGenerator({ statusCode: 200, body: { message: 'user updated' } });
  },
});
