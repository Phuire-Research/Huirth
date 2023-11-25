/*<$
For the framework Stratimux and the logixUX Project, generate a test to ensure that the file system is loaded and working as intended.
$>*/
/*<#*/
import { ActionStrategy, Counter, axiumSelectOpen, counterName, createAxium, createCounterConcept, selectState, strategyBegin, strategySequence } from 'stratimux';
import { logixUXPlusSevenStrategy } from '../concepts/logixUX/strategies/countPlusSeven.strategy';

test('Stratimux test sequence of counting strategies', (done) => {
  console.log('BEGIN');
  const axium = createAxium('axium Counting Sequence', [
    createCounterConcept(),
  ], true, true);
  const plan = axium.stage('File System Map Concept Directory Test', [
    (_, dispatch) => {
      console.log('STEP 1');
      dispatch(strategyBegin(
        strategySequence([
          logixUXPlusSevenStrategy(0, 1),
          logixUXPlusSevenStrategy(7, 1),
          logixUXPlusSevenStrategy(14, 1),
          logixUXPlusSevenStrategy(21, 1),
        ]) as ActionStrategy
      ), {
        iterateStage: true,
        on: {
          selector: axiumSelectOpen,
          expected: true
        },
      });
    },
    (concepts) => {
      const state = selectState(concepts, counterName) as Counter;
      console.log('Count: ', state);
      if (state.count === 21) {
        expect(true).toBe(true);
        setTimeout(() => {
          done();
        }, 500);
        plan.conclude();
      }
    }
  ]);
});
/*#>*/