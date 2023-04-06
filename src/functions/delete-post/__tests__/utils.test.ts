import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { deletePostByIdInDynamoDB } from '../utils';

jest.mock('aws-sdk/clients/dynamodb');

const mockedDynamoClient = DocumentClient as jest.MockedClass<typeof DocumentClient>;

test('should delete a post in dynamoDB', async () => {
  mockedDynamoClient.prototype.delete.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce() as unknown,
  });

  const result = await deletePostByIdInDynamoDB('123');

  expect(result).toBeUndefined();

  expect(DocumentClient.prototype.delete).toBeCalledWith({
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      id: '123',
    },
  });
});
