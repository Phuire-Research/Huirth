/* eslint-disable indent */
/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will create a plan which will populate a new data set with the outcome of many
verbose counting strategies.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  axiumKick,
  createAsyncMethod,
  createQuality,
  defaultMethodCreator,
  defaultReducer,
  getAxiumState,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { LogixUXInnerCountField } from './innerCountBy.quality';
import { logixUXVerboseCountingStrategy } from '../strategies/verboseCounting.strategy';
import { DataSetTypes, NamedDataSet } from '../logixUX.model';
import { logixUXSetDataSet } from './setDataSet.quality';

export const logixUXGenerateVerboseCountingStrategyType: ActionType = 'Create logixUX generate a verbose counting data set';
export const logixUXGenerateVerboseCountingStrategy =
  prepareActionCreator(logixUXGenerateVerboseCountingStrategyType);

const logixUXGenerateVerboseCountingStrategyMethodCreator: MethodCreator = (concepts$) => createAsyncMethod((controller, action) => {
  if (concepts$) {
    console.log('This had been triggered');
    const limit = 55;
    const named: NamedDataSet = {
      name: 'VerboseCounting',
      type: DataSetTypes.general,
      dataSet: []
    };
    let length = 5;
    let iterations = 0;
    let currentTopic = '';
    const plan = concepts$.stage('Verbose Counting data set generation plan',
    [
      (_, dispatch) => {
        dispatch(axiumKick(), {
          iterateStage: true
        });
      },
      (_, dispatch) => {
        console.log('Transformation stage 1', iterations < 100, length < limit);
        if (iterations < 100 && length < limit) {
          const newStrategy = logixUXVerboseCountingStrategy(length);
          newStrategy.topic += iterations;
          currentTopic = newStrategy.topic;
          console.log('BEGIN STRATEGY', currentTopic);
          dispatch(strategyBegin(newStrategy), {
            iterateStage: true,
            throttle: 1
          });
        } else {
          console.log('END PLAN');
          dispatch(axiumKick(), {
            setStage: 3
          });
        }
      },
      (concepts, dispatch) => {
        const state = getAxiumState(concepts);
        console.log('Transformation stage 2', iterations, length, currentTopic === state.lastStrategy);
        if (state.lastStrategy === currentTopic) {
          named.dataSet.push({
            prompt: currentTopic,
            content: state.dialog + 'The final count: ' + (state.lastStrategyData as LogixUXInnerCountField).count + '.'
          });
          console.log(iterations);
          iterations++;
          if (iterations === 99) {
            if (length <= limit) {
              length++;
              iterations = 0;
            }
          }
          console.log('DISPATCH');
          dispatch(axiumKick(), {
            setStage: 1,
            throttle: 1
          });
        }
      },
      () => {
        console.log('Transformation stage 3', iterations, length, named.dataSet.length);
        controller.fire(logixUXSetDataSet({named}));
        plan.conclude();
      }
    ]);
  }
});

export const logixUXGenerateVerboseCountingStrategyQuality = createQuality(
  logixUXGenerateVerboseCountingStrategyType,
  defaultReducer,
  logixUXGenerateVerboseCountingStrategyMethodCreator
);
/*#>*/