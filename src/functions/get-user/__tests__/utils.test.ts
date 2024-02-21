import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { getUserByIdFromDynamoDB } from '../utils';

jest.mock('aws-sdk/clients/dynamodb');

const mockedDynamoClient = DocumentClient as jest.MockedClass<typeof DocumentClient>;

test('should return a user', async () => {
  const user = {
    username: '123',
    email: 'Lorem Ipsum',
  };

  mockedDynamoClient.prototype.get.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce({ Item: user }) as unknown,
  });

  const result = await getUserByIdFromDynamoDB('123');

  expect(result).toEqual(user);

  expect(DocumentClient.prototype.get).toBeCalledWith({
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      username: '123',
    },
  });
});

test('should return null if user not found', async () => {
  mockedDynamoClient.prototype.get.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce({ Item: undefined }) as unknown,
  });

  const result = await getUserByIdFromDynamoDB('123');

  expect(result).toBeNull();

  expect(DocumentClient.prototype.get).toBeCalledWith({
    TableName: process.env.USERS_TABLE_NAME || '',
    Key: {
      username: '123',
    },
  });
});
