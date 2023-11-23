/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that will generate a strategy to read, parse, and append to state the output of every FileDirent passed via the data field.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createActionNode,
  createMethodWithState,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import { LogixUXServerState } from '../logixUXServer.concept';
import { logixUXServerSendUpdateParsedProjectData } from '../strategies/client/logixUXServerSendUpdateParsedProjectData.helper';

export type LogixUXServerPrepareParsedProjectDataUpdatePayload = {
  name: string,
}
export const logixUXServerPrepareParsedProjectDataUpdateType: ActionType =
  'logixUXServer prepare parsed data set to be sent to client';
export const logixUXServerPrepareParsedProjectDataUpdate =
  prepareActionWithPayloadCreator<LogixUXServerPrepareParsedProjectDataUpdatePayload>(logixUXServerPrepareParsedProjectDataUpdateType);

const logixUXServerPrepareParsedProjectDataUpdateMethodCreator: MethodCreator = (concepts$, semaphore) =>
  createMethodWithState<LogixUXServerState>((action, state) => {
    if (action.strategy && action.strategy) {
      const strategy = action.strategy;
      const { name } = selectPayload<LogixUXServerPrepareParsedProjectDataUpdatePayload>(action);
      const { trainingData } = state;
      for (const dataSet of trainingData) {
        if (dataSet.name === name) {
          console.log('FOUND DATA SET', dataSet);
          strategy.currentNode.successNode = createActionNode(logixUXServerSendUpdateParsedProjectData(dataSet), {
            successNode: null,
            failureNode: null
          });
          return strategySuccess(strategy);
        }
      }
      return strategyFailed(strategy, strategyData_appendFailure(strategy, 'Did not find data set'));
    } else {
      return action;
    }
  }, concepts$ as UnifiedSubject, semaphore as number);

export const logixUXServerPrepareParsedProjectDataUpdateQuality = createQuality(
  logixUXServerPrepareParsedProjectDataUpdateType,
  defaultReducer,
  logixUXServerPrepareParsedProjectDataUpdateMethodCreator,
);
/*#>*/