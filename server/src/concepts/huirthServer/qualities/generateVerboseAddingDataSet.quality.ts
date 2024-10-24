/* eslint-disable indent */
/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will create a plan which will populate a new data set with the outcome of many
verbose adding strategies.
$>*/
/*<#*/
import {
  createAsyncMethodWithConcepts,
  nullReducer,
  getMuxiumState,
  selectState,
  strategyBegin,
  createQualityCard,
  muxiumSelectLastStrategy,
} from 'stratimux';
import { DataSetTypes, NamedDataSet } from '../../huirth/huirth.model';
import { huirthServerVerboseAddingStrategy } from '../strategies/verboseAdding.strategy';
import { huirthServerInnerAddField } from './innerAddTo.quality';
import { huirthServerSaveDataSetStrategy } from '../strategies/saveDataSet.strategy';
import { FileSystemState, fileSystemName } from '../../fileSystem/fileSystem.concept';
import { huirth_convertNumberToStringVerbose } from '../verboseNumber.model';
import { TRANSFORMATION_DATASET_LIMIT } from '../huirthServer.model';
import { HuirthServerDeck, huirthServerState } from '../huirthServer.concept';

export const huirthServerGenerateVerboseAddingStrategy = createQualityCard<huirthServerState, HuirthServerDeck>({
  type: 'huirthServer generate a verbose adding data set',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethodWithConcepts(({ controller, concepts_, deck }) => {
      const muxiumState = getMuxiumState(concepts_);
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      if (fileSystemState) {
        console.log('This had been triggered');
        const limit = TRANSFORMATION_DATASET_LIMIT;
        const named: NamedDataSet = {
          name: 'VerboseAdding',
          type: DataSetTypes.general,
          dataSet: [],
          index: 0,
        };
        let length = 5;
        let iterations = 0;
        let currentTopic = '';
        const plan = muxiumState.concepts$.plan(0)('Verbose Adding data set generation plan', ({ stage, k__ }) => [
          stage(({ dispatch, e }) => {
            console.log('Transformation stage 1', iterations < 100, length < limit);
            if (iterations < 100 && length < limit) {
              const newStrategy = huirthServerVerboseAddingStrategy(length, deck);
              newStrategy.topic = iterations + 1 + '.) ' + newStrategy.topic;
              currentTopic = newStrategy.topic;
              console.log('BEGIN STRATEGY', currentTopic);
              dispatch(strategyBegin(newStrategy), {
                iterateStage: true,
                throttle: 0,
              });
            } else {
              console.log('END PLAN');
              dispatch(e.muxiumKick(), {
                setStage: 2,
              });
            }
          }),
          stage(
            ({ concepts, dispatch, e }) => {
              const state = getMuxiumState(concepts);
              console.log(
                'Transformation stage 2',
                iterations,
                length,
                currentTopic === state.lastStrategy,
                currentTopic,
                state.lastStrategy
              );
              if (state.lastStrategy === currentTopic) {
                named.dataSet.push({
                  prompt: (currentTopic + '.').trim(),
                  content: (
                    '' +
                    state.lastStrategyDialog +
                    '\nThe final sum is ' +
                    huirth_convertNumberToStringVerbose((state.lastStrategyData as huirthServerInnerAddField).sum) +
                    '.'
                  ).trim(),
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
                dispatch(e.muxiumKick(), {
                  setStage: 0,
                  throttle: 0,
                });
              }
            },
            { beat: 30, selectors: [muxiumSelectLastStrategy] }
          ),
          stage(({ concepts, stagePlanner }) => {
            console.log('Transformation stage 3', iterations, length, named.dataSet.length);
            controller.fire(strategyBegin(huirthServerSaveDataSetStrategy(fileSystemState.root, named, 'VerboseAdding', concepts, deck)));
            stagePlanner.conclude();
          }),
        ]);
      }
    }, 5000),
});
/*#>*/
