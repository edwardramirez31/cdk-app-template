/* eslint-disable @typescript-eslint/no-empty-function */
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mocked } from 'jest-mock';

import { getUserHandler } from '../handler';
import { getUserByIdFromDynamoDB } from '../utils';

jest.mock('../utils', () => ({
  getUserByIdFromDynamoDB: jest.fn(),
}));

const user = {
  username: '123',
  email: 'Lorem Ipsum',
};

test('should return a user', async () => {
  const event = {
    pathParameters: {
      id: '123',
    },
  };

  mocked(getUserByIdFromDynamoDB).mockResolvedValue(user);

  const result = await getUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(200);
  expect(result?.body).toBe(JSON.stringify({ item: { ...user } }));
});

test('should return 404 if user not found', async () => {
  const event = {
    pathParameters: {
      id: '123',
    },
  };

  mocked(getUserByIdFromDynamoDB).mockResolvedValue(null);

  const result = await getUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(404);
  expect(result?.body).toBe(JSON.stringify({ message: 'user not found' }));
});

test('should return 400 if id is not present', async () => {
  const event = {
    pathParameters: {},
  };

  const result = await getUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(result?.body).toBe(JSON.stringify({ message: 'user id should be present' }));
});
