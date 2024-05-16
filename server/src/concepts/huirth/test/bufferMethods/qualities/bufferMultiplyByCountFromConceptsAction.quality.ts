/*<$
For the asynchronous graph programming framework Stratimux and Experiment Concept, generate a method that will buffer
the dispatch of an action assigned to payload.
$>*/
/*<#*/

import { Action, CounterState, counterAdd, counterName, createActionNode, createMethodBuffer, createMethodBufferWithConcepts, createQualitySet, createQualitySetWithPayload, createStrategy, defaultReducer, selectPayload, selectState, strategyBegin } from 'stratimux';


export const [
  experimentBufferMultiplyByCountFromConcepts,
  experimentBufferMultiplyByCountFromConceptsType,
  experimentBufferMultiplyByCountFromConceptsQuality
] = createQualitySet({
  type: 'Experiment will buffer multiply count using concepts accessing counter state',
  reducer: defaultReducer,
  methodCreator: (c, s) => createMethodBufferWithConcepts((_, concepts) => {
    const counterState = selectState<CounterState>(concepts, counterName);
    return strategyBegin(createStrategy({
      initialNode: createActionNode(counterAdd()),
      topic: 'Buffered Action Topic'
    }));
  }, c, s, 10)
});
/*#>*/