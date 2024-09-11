/*<$
For the asynchronous graph programming framework Stratimux and Experiment Concept, generate a method that will buffer asynchronously
the dispatch of an action assigned to payload.
$>*/
/*<#*/

import {
  CounterState,
  counterAdd,
  counterName,
  createActionNode,
  createAsyncMethodBufferWithConcepts,
  createQualityCard,
  createStrategy,
  defaultReducer,
  selectState,
  strategyBegin,
} from '@phuire/stratimux';

export const [
  experimentAsyncBufferMultiplyByCountFromConcepts,
  experimentAsyncBufferMultiplyByCountFromConceptsType,
  experimentAsyncBufferMultiplyByCountFromConceptsQuality,
] = createQualityCard({
  type: 'Experiment will asynchronously buffer multiply count using concepts accessing counter state',
  reducer: defaultReducer,
  methodCreator: (c, s) =>
    createAsyncMethodBufferWithConcepts(
      (controller, _, concepts) => {
        setTimeout(() => {
          const counterState = selectState<CounterState>(concepts, counterName);
          controller.fire(
            strategyBegin(
              createStrategy({
                initialNode: createActionNode(counterAdd()),
                topic: 'AsyncBuffered Action Topic',
              })
            )
          );
        }, 50);
      },
      c,
      s,
      10
    ),
});
/*#>*/
