import { apiGwProxy } from '../../decorators/api-gateway-proxy';
import { getLogger } from '../../utils/logger';
import { responseGenerator } from '../../utils/response-generator';
import { createPostSchema } from '../../validators/schemas/post';
import type { Post } from '../get-post/types';

import { createPostInDynamoDB } from './utils';

export const createPostHandler = apiGwProxy<Omit<Post, 'createdAt'>>({
  schema: createPostSchema,
  handler: async (event, context) => {
    const logger = getLogger();
    logger.info(event, 'Event received');
    logger.info(context, 'Context received');
    logger.info(process.env, 'Environment received');

    const { id, body } = event.body!;
    const createdAt = Date.now();

    await createPostInDynamoDB({ id, body, createdAt });

    return responseGenerator({ statusCode: 201, body: { message: 'post created' } });
  },
});
