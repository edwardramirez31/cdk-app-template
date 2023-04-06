import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { createPostInDynamoDB } from '../utils';

jest.mock('aws-sdk/clients/dynamodb');

const mockedDynamoClient = DocumentClient as jest.MockedClass<typeof DocumentClient>;

test('should create a post in dynamoDB', async () => {
  const post = {
    id: '123',
    createdAt: 324_234,
    body: 'Lorem Ipsum',
  };

  mockedDynamoClient.prototype.put.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce() as unknown,
  });

  const result = await createPostInDynamoDB(post);

  expect(result).toBeUndefined();

  expect(DocumentClient.prototype.put).toBeCalledWith({
    TableName: process.env.POSTS_TABLE_NAME || '',
    Item: {
      id: '123',
      createdAt: 324_234,
      body: 'Lorem Ipsum',
    },
  });
});
