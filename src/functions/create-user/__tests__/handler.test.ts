import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mocked } from 'jest-mock';

import { createUserHandler } from '../handler';
import { createUserInDynamoDB } from '../utils';

jest.mock('../utils', () => ({
  createUserInDynamoDB: jest.fn(),
}));

const user = {
  username: '123',
  email: 'Lorem Ipsum',
};

test('should create a user', async () => {
  const event = {
    body: JSON.stringify(user),
  };

  mocked(createUserInDynamoDB).mockResolvedValue();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await createUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(201);
  expect(result?.body).toBe(JSON.stringify({ message: 'user created' }));
});

test('should return 400 if body is not present', async () => {
  const event = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await createUserHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(JSON.parse(result?.body ?? '{}')).toMatchObject({
    message: 'request validation error',
  });
});
