/*<$
For the asynchronous graph programming framework Stratimux, generate a tests and demonstrates how buffer methods perform their functionality.
$>*/
/*<#*/

import {
  CounterState,
  muxiumKick,
  counterAdd,
  counterName,
  counterSelectCount,
  muxification,
  createCounterConcept,
  createExperimentConcept,
  createExperimentState,
  createStage,
  selectState,
  stageWaitForOpenThenIterate,
} from 'stratimux';
import {
  experimentAsyncBufferMultiplyByCountFromConcepts,
  experimentAsyncBufferMultiplyByCountFromConceptsQuality,
} from './qualities/asyncBufferMultiplyByCountFromConceptsAction.quality';
import {
  experimentBufferMultiplyByCountFromConcepts,
  experimentBufferMultiplyByCountFromConceptsQuality,
} from './qualities/bufferMultiplyByCountFromConceptsAction.quality';
import { experimentBufferNextAction, experimentBufferNextActionQuality } from './qualities/bufferSomeAction.quality';

test('Buffer method periodic count', (done) => {
  const experiment = createExperimentConcept(createExperimentState(), [experimentBufferNextActionQuality]);
  const muxium = muxification('Experiment method buffer defer actions', [createCounterConcept(), experiment]);
  const plan = muxium.plan('Experiment buffer add 4 after 10ms', [
    stageWaitForOpenThenIterate(() => muxiumKick()),
    createStage((_, dispatch) => {
      dispatch(
        experimentBufferNextAction({
          action: counterAdd(),
        }),
        {
          iterateStage: true,
        }
      );
    }),
    createStage((concepts, dispatch) => {
      const counterState = selectState<CounterState>(concepts, counterName);
      expect(counterState?.count).toBe(0);
      dispatch(
        experimentBufferNextAction({
          action: counterAdd(),
        }),
        {
          iterateStage: true,
        }
      );
    }),
    createStage((concepts, dispatch) => {
      const counterState = selectState<CounterState>(concepts, counterName);
      expect(counterState?.count).toBe(0);
      dispatch(
        experimentBufferNextAction({
          action: counterAdd(),
        }),
        {
          iterateStage: true,
        }
      );
    }),
    createStage((concepts, dispatch) => {
      const counterState = selectState<CounterState>(concepts, counterName);
      expect(counterState?.count).toBe(0);
      dispatch(
        experimentBufferNextAction({
          action: counterAdd(),
        }),
        {
          iterateStage: true,
        }
      );
    }),
    createStage(
      (concepts, _dispatch, changes) => {
        const counterState = selectState<CounterState>(concepts, counterName);
        if (changes.length > 0) {
          expect(counterState?.count).toBe(4);
          setTimeout(() => {
            plan.conclude();
            muxium.close();
            done();
          }, 10);
        }
      },
      { selectors: [counterSelectCount], beat: 200 }
    ),
    createStage(() => {
      plan.conclude();
    }),
  ]);
});

// test('Buffer method with concept towards final multiply of count', (done) => {
//   const experiment = createExperimentConcept(createExperimentState(), [experimentBufferMultiplyByCountFromConceptsQuality]);
//   const muxium = muxification('Experiment method buffer defer multiply', [createCounterConcept(), experiment]);
//   const plan = muxium.plan('Experiment buffer multiply by 2 from concept state after 10ms', [
//     stageWaitForOpenThenIterate(() => muxiumKick()),
//     createStage((_, dispatch) => {
//       dispatch(counterSetCount({
//         newCount: 2
//       }), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, dispatch) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       expect(counterState?.count).toBe(2);
//       dispatch(experimentBufferMultiplyByCountFromConcepts(), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, dispatch) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       expect(counterState?.count).toBe(2);
//       dispatch(experimentBufferMultiplyByCountFromConcepts(), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, dispatch) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       expect(counterState?.count).toBe(2);
//       dispatch(experimentBufferMultiplyByCountFromConcepts(), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, _dispatch, changes) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       if (changes.length > 0) {
//         expect(counterState?.count).toBe(16);
//         setTimeout(() => {
//           plan.conclude();
//           muxium.close();
//           done();
//         }, 10);
//       }
//     }, {selectors: [counterSelectCount], beat: 200}),
//     createStage(() => {
//       plan.conclude();
//     })
//   ]);
// });

// test('Buffer method with concept towards final multiply of count', (done) => {
//   const experiment = createExperimentConcept(createExperimentState(), [experimentAsyncBufferMultiplyByCountFromConceptsQuality]);
//   const muxium = muxification('Experiment method buffer defer multiply', [createCounterConcept(), experiment], {
//     // logActionStream: true
//   });
//   const plan = muxium.plan('Experiment buffer multiply by 2 from concept state after 10ms', [
//     stageWaitForOpenThenIterate(() => muxiumKick()),
//     createStage((_, dispatch) => {
//       dispatch(counterSetCount({
//         newCount: 2
//       }), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, dispatch) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       expect(counterState?.count).toBe(2);
//       dispatch(experimentAsyncBufferMultiplyByCountFromConcepts(), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, dispatch) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       expect(counterState?.count).toBe(2);
//       dispatch(experimentAsyncBufferMultiplyByCountFromConcepts(), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, dispatch) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       expect(counterState?.count).toBe(2);
//       dispatch(experimentAsyncBufferMultiplyByCountFromConcepts(), {
//         iterateStage: true,
//       });
//     }),
//     createStage((concepts, _dispatch, changes) => {
//       const counterState = selectState<CounterState>(concepts, counterName);
//       console.log('CHECK STATE', counterState);
//       if (changes.length > 0) {
//         expect(counterState?.count).toBe(16);
//         setTimeout(() => {
//           plan.conclude();
//           muxium.close();
//           done();
//         }, 10);
//       }
//     }, {selectors: [counterSelectCount], beat: 200}),
//     createStage(() => {
//       plan.conclude();
//     })
//   ]);
//   // muxium.subscribe(c => {
//   //   const s = getMuxiumState(c);
//   //   console.log(s.head, s.body, s.tail);
//   // });
// });
/*#>*/
