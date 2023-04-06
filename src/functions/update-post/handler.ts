import { apiGwProxy } from '../../decorators/api-gateway-proxy';
import { BackendError } from '../../models/error';
import { getLogger } from '../../utils/logger';
import { createPostSchema } from '../../validators/schemas/post';
import type { Post } from '../get-post/types';

import { updatePostByIdInDynamoDB } from './utils';

export const updatePostHandler = apiGwProxy<Omit<Post, 'createdAt' | 'id'>>({
  schema: createPostSchema,
  handler: async (event, context) => {
    const logger = getLogger();
    logger.info(event, 'Event received');
    logger.info(context, 'Context received');
    logger.info(process.env, 'Environment received');

    const id = event.pathParameters?.id;

    if (!id) {
      throw new BackendError(400, 'path parameter not found', { message: 'post id is required' });
    }

    const { body } = event.body!;

    await updatePostByIdInDynamoDB({ id, body });

    return { statusCode: 200, body: JSON.stringify({ message: 'post updated' }) };
  },
});
