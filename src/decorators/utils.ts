import { BackendError } from '../models/error';

import type { GatewayProxyEvent, Event } from './types';

export const eventBodyParser = <T>(event: Event): GatewayProxyEvent<T> => {
  try {
    return { ...event, body: event.body ? JSON.parse(event.body) : {} };
  } catch {
    throw new BackendError(400, 'Failed to parse request body', { message: 'Failed to parse request body' });
    // { response: { status: 400, body: 'Failed to parse request body' } };
  }
};
