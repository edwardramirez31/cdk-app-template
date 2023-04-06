import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mocked } from 'jest-mock';

import { deletePostHandler } from '../handler';
import { deletePostByIdInDynamoDB } from '../utils';

jest.mock('../utils', () => ({
  deletePostByIdInDynamoDB: jest.fn(),
}));

test('should delete a post', async () => {
  const event = {
    pathParameters: { id: '123' },
  };

  mocked(deletePostByIdInDynamoDB).mockResolvedValue();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await deletePostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(200);
  expect(result?.body).toBe(JSON.stringify({ message: 'post deleted' }));
});

test('should return 400 if id is not present', async () => {
  const event = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const result = await deletePostHandler(event as unknown as APIGatewayProxyEvent, {} as Context, () => {});

  expect(result?.statusCode).toBe(400);
  expect(result?.body).toBe(JSON.stringify({ message: 'post id is required' }));
});
