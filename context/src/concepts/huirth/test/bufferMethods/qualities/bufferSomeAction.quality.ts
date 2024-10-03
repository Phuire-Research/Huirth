/*<$
For the asynchronous graph programming framework Stratimux and Experiment Concept, generate a method that will buffer
the dispatch of an action assigned to payload.
$>*/
/*<#*/

import {
  Action,
  createActionNode,
  createMethodBuffer,
  createQualityCardWithPayload,
  createStrategy,
  defaultReducer,
  selectPayload,
  strategyBegin,
} from 'stratimux';

type ExperimentBufferNextActionPayload = {
  action: Action;
};

export const [experimentBufferNextAction, experimentBufferNextActionType, experimentBufferNextActionQuality] =
  createQualityCardWithPayload<ExperimentBufferNextActionPayload>({
    type: 'Experiment will buffer incoming actions for a set duration',
    reducer: defaultReducer,
    methodCreator: () =>
      createMethodBuffer((action) => {
        const act = selectPayload<ExperimentBufferNextActionPayload>(action).action;
        return strategyBegin(
          createStrategy({
            initialNode: createActionNode(act),
            topic: 'Buffered Action Topic',
          })
        );
      }, 10),
  });
/*#>*/
