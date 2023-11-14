import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithConcepts,
  createQuality,
  defaultReducer,
  isConceptLoaded,
  prepareActionCreator,
} from 'stratimux';
import { webSocketClientAppendToActionQue } from '../../webSocketClient/qualities/appendActionQue.quality';
import { webSocketClientName } from '../../webSocketClient/webSocketClient.concept';

export const logixUXPushToServerSaveTrainingDataType: ActionType = 'logixUX push saveTrainingData action to Server';
export const logixUXPushToServerSaveTrainingData =
  prepareActionCreator(logixUXPushToServerSaveTrainingDataType);

// Better flow would be to edit all payload to be forced into the Record<string, unknown> format.
// Very important for when I am not in a build competition.
const createLogixUXPushToServerSaveTrainingDataMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithConcepts(
    (action, concepts) => {
      const isWebSocketClient = isConceptLoaded(concepts, webSocketClientName);
      if ((isWebSocketClient)) {
        return webSocketClientAppendToActionQue({actionQue: [logixUXPushToServerSaveTrainingData()]});
      } else {
        return action;
      }
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXPushToServerSaveTrainingDataQuality = createQuality(
  logixUXPushToServerSaveTrainingDataType,
  defaultReducer,
  createLogixUXPushToServerSaveTrainingDataMethodCreator,
);