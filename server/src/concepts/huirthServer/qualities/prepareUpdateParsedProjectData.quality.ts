/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will generate a strategy to read, parse, and append to state the output of every FileDirent passed via the data field.
$>*/
/*<#*/
import {
  UnifiedSubject,
  createActionNode,
  createMethodWithState,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import { huirthServerState } from '../huirthServer.concept';
import { huirthServerSendUpdateParsedProjectData } from '../strategies/client/huirthServerSendUpdateParsedProjectData.helper';

export type huirthServerPrepareParsedProjectDataUpdatePayload = {
  name: string,
}

export const [
  huirthServerPrepareParsedProjectDataUpdate,
  huirthServerPrepareParsedProjectDataUpdateType,
  huirthServerPrepareParsedProjectDataUpdateQuality
] = createQualitySetWithPayload<huirthServerPrepareParsedProjectDataUpdatePayload>({
  type: 'huirthServer prepare parsed data set to be sent to client',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodWithState<huirthServerState>((action, state) => {
      if (action.strategy && action.strategy) {
        const strategy = action.strategy;
        const { name } = selectPayload<huirthServerPrepareParsedProjectDataUpdatePayload>(action);
        const { trainingData } = state;
        for (const dataSet of trainingData) {
          if (dataSet.name === name) {
            console.log('FOUND DATA SET', dataSet);
            strategy.currentNode.successNode = createActionNode(huirthServerSendUpdateParsedProjectData(dataSet), {
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
    }, concepts$ as UnifiedSubject, semaphore as number)
});
/*#>*/