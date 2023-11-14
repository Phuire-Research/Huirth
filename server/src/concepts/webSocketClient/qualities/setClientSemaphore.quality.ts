import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  defaultReducer,
  prepareActionWithPayloadCreator,
} from 'stratimux';

export type WebSocketClientSetClientSemaphorePayload = {
  semaphore: number,
}
// Dummy Action
export const webSocketClientSetClientSemaphoreType: ActionType =
  'Web Socket Server set Client Semaphore';
export const webSocketClientSetClientSemaphore =
  prepareActionWithPayloadCreator<WebSocketClientSetClientSemaphorePayload>(webSocketClientSetClientSemaphoreType);

export const webSocketClientSetClientSemaphoreQuality = createQuality(
  webSocketClientSetClientSemaphoreType,
  defaultReducer,
  defaultMethodCreator,
);
