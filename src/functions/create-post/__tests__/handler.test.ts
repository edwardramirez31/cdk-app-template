import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mocked } from 'jest-mock';

import { createPostHandler } from '../handler';
import { createPostInDynamoDB } from '../utils';

jest.mock('../utils', () => ({
  createPostInDynamoDB: jest.fn(),
}));

const post = {
  id: '123',
  body: 'Lorem Ipsum',
};

test('should create a post', async () => {
  const event = {
    body: JSON.stringify(post),
  };

  mocked(createPostInDynamoDB).mockResolvedValue();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await createPostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(201);
  expect(result?.body).toBe(JSON.stringify({ message: 'post created' }));
});

test('should return 400 if body is not present', async () => {
  const event = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await createPostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(JSON.parse(result?.body ?? '{}')).toMatchObject({
    message: 'request validation error',
  });
});
