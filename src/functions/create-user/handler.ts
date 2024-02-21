import { apiGwProxy } from '../../decorators/api-gateway-proxy';
import { getLogger } from '../../utils/logger';
import { responseGenerator } from '../../utils/response-generator';
import { createUserSchema } from '../../validators/schemas/user';
import type { User } from '../get-user/types';

import { createUserInDynamoDB } from './utils';

export const createUserHandler = apiGwProxy<Omit<User, 'createdAt'>>({
  schema: createUserSchema,
  handler: async (event, context) => {
    const logger = getLogger();
    logger.info(event, 'Event received');
    logger.info(context, 'Context received');
    logger.info(process.env, 'Environment received');

    const user = event.body!;

    await createUserInDynamoDB(user);

    return responseGenerator({ statusCode: 201, body: { message: 'user created' } });
  },
});
