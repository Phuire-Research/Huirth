/* eslint-disable indent */
/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will create a plan which will populate a new data set with the outcome of many
verbose adding strategies.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  axiumKick,
  createAsyncMethodWithConcepts,
  createQuality,
  nullReducer,
  getAxiumState,
  prepareActionCreator,
  selectState,
  strategyBegin,
  createStage,
} from 'stratimux';
import { DataSetTypes, NamedDataSet } from '../../logixUX/logixUX.model';
import { logixUXServerVerboseAddingStrategy } from '../strategies/verboseAdding.strategy';
import { LogixUXServerInnerAddField } from './innerAddTo.quality';
import { logixUXServerSaveDataSetStrategy } from '../strategies/saveDataSet.strategy';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { logixUX_convertNumberToStringVerbose } from '../verboseNumber.model';
import { TRANSFORMATION_DATASET_LIMIT } from '../logixUXServer.model';

export const logixUXServerGenerateVerboseAddingStrategyType: ActionType = 'logixUXServer generate a verbose adding data set';
export const logixUXServerGenerateVerboseAddingStrategy =
  prepareActionCreator(logixUXServerGenerateVerboseAddingStrategyType);

const logixUXServerGenerateVerboseAddingStrategyMethodCreator: MethodCreator = (concepts$, semaphore) => createAsyncMethodWithConcepts((controller, action, cpts) => {
  const fileSystemState = selectState<FileSystemState>(cpts, fileSystemName);
  if (concepts$ && fileSystemState) {
    console.log('This had been triggered');
    const limit = TRANSFORMATION_DATASET_LIMIT;
    const named: NamedDataSet = {
      name: 'VerboseAdding',
      type: DataSetTypes.general,
      dataSet: [],
      index: 0
    };
    let length = 5;
    let iterations = 0;
    let currentTopic = '';
    const plan = concepts$.plan('Verbose Adding data set generation plan',
    [
      createStage((_, dispatch) => {
        console.log('Transformation stage 1', iterations < 100, length < limit);
        if (iterations < 100 && length < limit) {
          const newStrategy = logixUXServerVerboseAddingStrategy(length);
          newStrategy.topic = iterations + 1 + '.)' + newStrategy.topic;
          currentTopic = newStrategy.topic;
          console.log('BEGIN STRATEGY', currentTopic);
          dispatch(strategyBegin(newStrategy), {
            iterateStage: true,
            throttle: 1
          });
        } else {
          console.log('END PLAN');
          dispatch(axiumKick(), {
            setStage: 2
          });
        }
      }),
      createStage((concepts, dispatch) => {
        const state = getAxiumState(concepts);
        console.log('Transformation stage 2', iterations, length, currentTopic === state.lastStrategy);
        if (state.lastStrategy === currentTopic) {
          named.dataSet.push({
            prompt: (currentTopic + '.').trim(),
            content: ('' + state.lastStrategyDialog + '\nThe final sum is ' + logixUX_convertNumberToStringVerbose((state.lastStrategyData as LogixUXServerInnerAddField).sum) + '.').trim()
          });
          console.log(iterations);
          iterations++;
          if (iterations === 100) {
            if (length <= limit) {
              length++;
              iterations = 0;
            }
          }
          console.log('DISPATCH');
          dispatch(axiumKick(), {
            setStage: 0,
            throttle: 1
          });
        }
      }),
      createStage(() => {
        console.log('Transformation stage 3', iterations, length, named.dataSet.length);
        controller.fire(strategyBegin(logixUXServerSaveDataSetStrategy(fileSystemState.root, named, 'VerboseAdding')));
        plan.conclude();
      })
    ]);
  }
}, concepts$ as UnifiedSubject, semaphore as number);

export const logixUXServerGenerateVerboseAddingStrategyQuality = createQuality(
  logixUXServerGenerateVerboseAddingStrategyType,
  nullReducer,
  logixUXServerGenerateVerboseAddingStrategyMethodCreator
);
/*#>*/