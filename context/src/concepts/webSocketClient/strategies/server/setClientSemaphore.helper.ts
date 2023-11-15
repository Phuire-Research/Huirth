import { createAction } from 'stratimux';

export const webSocketClientSetClientSemaphore = (payload: { semaphore: number }) =>
  createAction('Web Socket Server set Client Semaphore', payload);
