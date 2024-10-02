/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will generate a strategy to read, parse, and append to state the output of every FileDirent passed via the data field.
$>*/
/*<#*/
import {
  createActionNode,
  createMethodWithState,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  selectPayload,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import { huirthServerState } from '../huirthServer.concept';
import { huirthServerSendUpdateParsedProjectData } from '../strategies/client/huirthServerSendUpdateParsedProjectData.helper';

export type huirthServerPrepareParsedProjectDataUpdatePayload = {
  name: string;
};

export const huirthServerPrepareParsedProjectDataUpdate = createQualityCardWithPayload<
  huirthServerState,
  huirthServerPrepareParsedProjectDataUpdatePayload
>({
  type: 'huirthServer prepare parsed data set to be sent to client',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodWithState(({ action, state }) => {
      if (action.strategy) {
        const strategy = action.strategy;
        const { name } = selectPayload<huirthServerPrepareParsedProjectDataUpdatePayload>(action);
        const { trainingData } = state;
        for (const dataSet of trainingData) {
          if (dataSet.name === name) {
            console.log('FOUND DATA SET', dataSet);
            const nextStrategy = createStrategy({
              initialNode: createActionNode(huirthServerSendUpdateParsedProjectData(dataSet), {
                successNode: null,
                failureNode: null,
              }),
              topic: 'Update Client of Parsed Project',
            });
            strategy.puntedStrategy?.push(nextStrategy);
            return strategySuccess(strategy);
          }
        }
        return strategyFailed(strategy, strategyData_appendFailure(strategy, 'Did not find data set'));
      } else {
        return action;
      }
    }),
});
/*#>*/
