import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { updateUserByIdInDynamoDB } from '../utils';

jest.mock('aws-sdk/clients/dynamodb');

const mockedDynamoClient = DocumentClient as jest.MockedClass<typeof DocumentClient>;

test('should update a user in dynamoDB', async () => {
  const user = {
    username: '123',
    email: 'Lorem Ipsum',
  };

  mockedDynamoClient.prototype.update.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce() as unknown,
  });

  const result = await updateUserByIdInDynamoDB(user);

  expect(result).toBeUndefined();

  expect(DocumentClient.prototype.update).toBeCalledWith({
    TableName: process.env.USERS_TABLE_NAME || '',
    Key: {
      username: { S: '123' },
      email: { S: 'Lorem Ipsum' },
    },
    UpdateExpression: 'set #username = :username',
    ExpressionAttributeNames: {
      '#username': 'username',
    },
    ExpressionAttributeValues: {
      ':username': { S: '123' },
    },
  });
});
