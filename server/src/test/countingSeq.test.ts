/*<$
For the graph programming framework Stratimux and the huirth Project, generate a test to ensure that the file system is loaded and working as intended.
$>*/
/*<#*/
import {
  ActionStrategy,
  CounterState,
  muxiumSelectOpen,
  counterName,
  muxification,
  createCounterConcept,
  createStage,
  selectSlice,
  selectState,
  strategyBegin,
  strategySequence,
} from 'stratimux';
import { huirthPlusSevenStrategy } from '../concepts/huirth/strategies/countPlusSeven.strategy';

test('Stratimux test sequence of counting strategies', (done) => {
  console.log('BEGIN');
  const muxium = muxification('muxium Counting Sequence', [createCounterConcept()]);
  const plan = muxium.plan('File System Map Concept Directory Test', [
    createStage(
      (concepts, dispatch) => {
        console.log('STEP 1');
        if (selectSlice(concepts, muxiumSelectOpen) === true) {
          dispatch(
            strategyBegin(
              strategySequence([
                huirthPlusSevenStrategy(0, 1),
                huirthPlusSevenStrategy(7, 1),
                huirthPlusSevenStrategy(14, 1),
                huirthPlusSevenStrategy(21, 1),
              ]) as ActionStrategy
            ),
            {
              iterateStage: true,
            }
          );
        }
      },
      { selectors: [muxiumSelectOpen] }
    ),
    createStage((concepts) => {
      const state = selectState(concepts, counterName) as CounterState;
      console.log('Count: ', state);
      if (state.count === 21) {
        expect(true).toBe(true);
        setTimeout(() => {
          done();
        }, 500);
        plan.conclude();
      }
    }),
  ]);
});
/*#>*/
