import { apiGwProxy } from '../../decorators/api-gateway-proxy';
import { BackendError } from '../../models/error';
import { getLogger } from '../../utils/logger';
import type { Post } from '../get-post/types';

import { deletePostByIdInDynamoDB } from './utils';

export const deletePostHandler = apiGwProxy<Omit<Post, 'createdAt'>>({
  handler: async (event, context) => {
    const logger = getLogger();
    logger.info(event, 'Event received');
    logger.info(context, 'Context received');
    logger.info(process.env, 'Environment received');

    const postId = event.pathParameters?.id;

    if (!postId) {
      throw new BackendError(400, 'path parameter not found', { message: 'post id is required' });
    }

    await deletePostByIdInDynamoDB(postId);

    return { statusCode: 200, body: JSON.stringify({ message: 'post deleted' }) };
  },
});
