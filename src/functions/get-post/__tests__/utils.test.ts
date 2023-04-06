import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { getPostByIdFromDynamoDB } from '../utils';

jest.mock('aws-sdk/clients/dynamodb');

const mockedDynamoClient = DocumentClient as jest.MockedClass<typeof DocumentClient>;

test('should return a post', async () => {
  const post = {
    id: '123',
    createdAt: 324_234,
    body: 'Lorem Ipsum',
  };

  mockedDynamoClient.prototype.get.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce({ Item: post }) as unknown,
  });

  const result = await getPostByIdFromDynamoDB('123');

  expect(result).toEqual(post);

  expect(DocumentClient.prototype.get).toBeCalledWith({
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      id: '123',
    },
  });
});

test('should return null if post not found', async () => {
  mockedDynamoClient.prototype.get.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce({ Item: undefined }) as unknown,
  });

  const result = await getPostByIdFromDynamoDB('123');

  expect(result).toBeNull();

  expect(DocumentClient.prototype.get).toBeCalledWith({
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      id: '123',
    },
  });
});
