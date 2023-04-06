// set function to create post in dynamoDB
// get tablename from environment variables
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const deletePostByIdInDynamoDB = async (id: string): Promise<void> => {
  const documentClient = new DocumentClient();

  const parameters = {
    TableName: process.env.POSTS_TABLE_NAME || '',
    Key: {
      id,
    },
  };

  await documentClient.delete(parameters).promise();
};
