import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { createUserInDynamoDB } from '../utils';

jest.mock('aws-sdk/clients/dynamodb');

const mockedDynamoClient = DocumentClient as jest.MockedClass<typeof DocumentClient>;

test('should create a user in dynamoDB', async () => {
  const user = {
    username: '123',
    email: 'Lorem Ipsum',
  };

  mockedDynamoClient.prototype.put.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce() as unknown,
  });

  const result = await createUserInDynamoDB(user);

  expect(result).toBeUndefined();

  expect(DocumentClient.prototype.put).toBeCalledWith({
    TableName: process.env.USERS_TABLE_NAME || '',
    Item: {
      username: '123',
      email: 'Lorem Ipsum',
    },
  });
});
