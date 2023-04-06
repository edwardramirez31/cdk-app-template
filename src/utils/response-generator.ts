import type { APIGatewayProxyResult } from 'aws-lambda';

import type { HttpStatusCode } from '../models/response';

interface ResponseGenerator {
  statusCode: HttpStatusCode;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const responseGenerator = ({ statusCode, body, headers = {} }: ResponseGenerator): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    ...headers,
    'Access-Control-Allow-Origin': 'http://localhost:3002',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});
