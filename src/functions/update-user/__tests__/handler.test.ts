import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mocked } from 'jest-mock';

import { updateUserHandler } from '../handler';
import { updateUserByIdInDynamoDB } from '../utils';

jest.mock('../utils', () => ({
  updateUserByIdInDynamoDB: jest.fn(),
}));

const user = {
  username: 'Lorem Ipsum',
  email: 'Lorem Ipsum',
};

test('should create a user', async () => {
  const event = {
    body: JSON.stringify(user),
    pathParameters: { id: '123' },
  };

  mocked(updateUserByIdInDynamoDB).mockResolvedValue();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await updateUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(200);
  expect(result?.body).toBe(JSON.stringify({ message: 'user updated' }));
});

test('should return 400 if body is not present', async () => {
  const event = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await updateUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(JSON.parse(result?.body ?? '{}')).toMatchObject({
    message: 'request validation error',
  });
});

test('should return 400 if id is not present', async () => {
  const event = {
    body: JSON.stringify(user),
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await updateUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(result?.body).toBe(JSON.stringify({ message: 'user id is required' }));
});
