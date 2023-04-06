import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mocked } from 'jest-mock';

import { updatePostHandler } from '../handler';
import { updatePostByIdInDynamoDB } from '../utils';

jest.mock('../utils', () => ({
  updatePostByIdInDynamoDB: jest.fn(),
}));

const post = {
  body: 'Lorem Ipsum',
};

test('should create a post', async () => {
  const event = {
    body: JSON.stringify(post),
    pathParameters: { id: '123' },
  };

  mocked(updatePostByIdInDynamoDB).mockResolvedValue();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await updatePostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(200);
  expect(result?.body).toBe(JSON.stringify({ message: 'post updated' }));
});

test('should return 400 if body is not present', async () => {
  const event = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await updatePostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(JSON.parse(result?.body ?? '{}')).toMatchObject({
    message: 'request validation error',
  });
});

test('should return 400 if id is not present', async () => {
  const event = {
    body: JSON.stringify(post),
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await updatePostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(result?.body).toBe(JSON.stringify({ message: 'post id is required' }));
});
