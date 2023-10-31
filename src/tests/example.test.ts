import {
  AxiumState,
  Counter,
  counterName,
  countingStrategy,
  countingTopic,
  createAxium,
  createCounterConcept,
  selectState,
  strategyBegin
} from 'stratimux';

test('Axium Counting Strategy Test', (done) => {
  const axium = createAxium('axiumStrategyTest', [createCounterConcept()], true, true);
  const plan = axium.stage('Counting Strategy Stage',
    [
      (_, dispatch) => {
        dispatch(strategyBegin(countingStrategy()), {
          iterateStage: true
        });
      }, (concepts) => {
        const axiumState = concepts[0].state as AxiumState;
        if (axiumState.lastStrategy === countingTopic) {
          const counter = selectState<Counter>(concepts, counterName);
          expect(counter?.count).toBe(1);
          setTimeout(() => {done();}, 500);
          plan.conclude();
          axium.close();
        }
      }
    ]);
});