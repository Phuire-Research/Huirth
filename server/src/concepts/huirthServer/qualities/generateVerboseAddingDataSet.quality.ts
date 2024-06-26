/* eslint-disable indent */
/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will create a plan which will populate a new data set with the outcome of many
verbose adding strategies.
$>*/
/*<#*/
import {
  axiumKick,
  createAsyncMethodWithConcepts,
  nullReducer,
  getAxiumState,
  selectState,
  strategyBegin,
  createStage,
  createQualitySet,
  Concepts,
  axiumSelectLastStrategy,
} from 'stratimux';
import { DataSetTypes, NamedDataSet } from '../../huirth/huirth.model';
import { huirthServerVerboseAddingStrategy } from '../strategies/verboseAdding.strategy';
import { huirthServerInnerAddField } from './innerAddTo.quality';
import { huirthServerSaveDataSetStrategy } from '../strategies/saveDataSet.strategy';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirth_convertNumberToStringVerbose } from '../verboseNumber.model';
import { TRANSFORMATION_DATASET_LIMIT } from '../huirthServer.model';
import { Subject } from 'rxjs';

export const [
  huirthServerGenerateVerboseAddingStrategy,
  huirthServerGenerateVerboseAddingStrategyType,
  huirthServerGenerateVerboseAddingStrategyQuality
] = createQualitySet({
  type: 'huirthServer generate a verbose adding data set',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) => createAsyncMethodWithConcepts((controller, action, cpts) => {
    const axiumState = getAxiumState(cpts);
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
      const plan = axiumState.concepts$.plan('Verbose Adding data set generation plan',
      [
        createStage((_, dispatch) => {
          console.log('Transformation stage 1', iterations < 100, length < limit);
          if (iterations < 100 && length < limit) {
            const newStrategy = huirthServerVerboseAddingStrategy(length);
            newStrategy.topic = iterations + 1 + '.) ' + newStrategy.topic;
            currentTopic = newStrategy.topic;
            console.log('BEGIN STRATEGY', currentTopic);
            dispatch(strategyBegin(newStrategy), {
              iterateStage: true,
              throttle: 0
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
          console.log('Transformation stage 2', iterations, length, currentTopic === state.lastStrategy, currentTopic, state.lastStrategy);
          if (state.lastStrategy === currentTopic) {
            named.dataSet.push({
              prompt: (currentTopic + '.').trim(),
              content: ('' + state.lastStrategyDialog + '\nThe final sum is ' + huirth_convertNumberToStringVerbose((state.lastStrategyData as huirthServerInnerAddField).sum) + '.').trim()
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
              throttle: 0
            });
          }
        }, {beat: 30, selectors: [axiumSelectLastStrategy]}),
        createStage((concepts) => {
          console.log('Transformation stage 3', iterations, length, named.dataSet.length);
          controller.fire(strategyBegin(huirthServerSaveDataSetStrategy(fileSystemState.root, named, 'VerboseAdding', concepts)));
          plan.conclude();
        })
      ]);
    }
  }, concepts$ as Subject<Concepts>, semaphore as number)
});
/*#>*/