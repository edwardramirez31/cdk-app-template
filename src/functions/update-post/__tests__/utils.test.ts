import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { updatePostByIdInDynamoDB } from '../utils';

jest.mock('aws-sdk/clients/dynamodb');

const mockedDynamoClient = DocumentClient as jest.MockedClass<typeof DocumentClient>;

test('should update a post in dynamoDB', async () => {
  const post = {
    id: '123',
    body: 'Lorem Ipsum',
  };

  mockedDynamoClient.prototype.update.mockReturnValue({
    // @ts-ignore
    promise: jest.fn().mockResolvedValueOnce() as unknown,
  });

  const result = await updatePostByIdInDynamoDB(post);

  expect(result).toBeUndefined();

  expect(DocumentClient.prototype.update).toBeCalledWith({
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      id: '123',
    },
    UpdateExpression: 'set #body = :body',
    ExpressionAttributeNames: {
      '#body': 'body',
    },
    ExpressionAttributeValues: {
      ':body': 'Lorem Ipsum',
    },
  });
});
