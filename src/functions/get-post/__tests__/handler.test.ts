/* eslint-disable @typescript-eslint/no-empty-function */
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mocked } from 'jest-mock';

import { getPostHandler } from '../handler';
import { getPostByIdFromDynamoDB } from '../utils';

jest.mock('../utils', () => ({
  getPostByIdFromDynamoDB: jest.fn(),
}));

const post = {
  id: '123',
  createdAt: 324_234,
  body: 'Lorem Ipsum',
};

test('should return a post', async () => {
  const event = {
    pathParameters: {
      id: '123',
    },
  };

  mocked(getPostByIdFromDynamoDB).mockResolvedValue(post);

  const result = await getPostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(200);
  expect(result?.body).toBe(JSON.stringify({ item: { ...post } }));
});

test('should return 404 if post not found', async () => {
  const event = {
    pathParameters: {
      id: '123',
    },
  };

  mocked(getPostByIdFromDynamoDB).mockResolvedValue(null);

  const result = await getPostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(404);
  expect(result?.body).toBe(JSON.stringify({ message: 'post not found' }));
});

test('should return 400 if id is not present', async () => {
  const event = {
    pathParameters: {},
  };

  const result = await getPostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(result?.body).toBe(JSON.stringify({ message: 'post id should be present' }));
});
