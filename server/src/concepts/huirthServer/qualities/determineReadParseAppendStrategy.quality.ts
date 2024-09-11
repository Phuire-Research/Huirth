/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will generate a strategy to read, parse, and append to state the output of every FileDirent passed via the data field.
$>*/
/*<#*/
import {
  ActionNode,
  ActionStrategy,
  axiumConclude,
  createActionNode,
  createActionNodeFromStrategy,
  createMethod,
  createMethodWithConcepts,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  selectPayload,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_unifyData,
  strategyFailed,
  strategySequence,
  strategySuccess,
} from '@phuire/stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import {
  ReadFileContentsAndAppendToDataField,
  fileSystemReadFileContentsAndAppendToData,
} from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';
import { huirthServerParseFileFromData } from './parseFileFromData.quality';
import { huirthServerPrepareParsedProjectDataUpdate } from './prepareUpdateParsedProjectData.quality';
import { huirthServerAppendParsedDataToNamedDataSet } from './appendParsedDataToNamedDataSet.quality';
import { DataSetTypes } from '../../huirth/huirth.model';
import { huirthGeneratedTrainingDataPageStrategy } from '../../huirth/strategies/pages/generatedTrainingDataPage.strategy';
import { huirthAddTrainingDataPageStrategy } from '../../huirth/strategies/addPageTrainingData.strategy';

export type huirthServerDetermineReadParseAppendStrategyPayload = {
  name: string;
  type: DataSetTypes;
};

const readAndParseStitch = (name: string, type: DataSetTypes): [ActionNode, ActionStrategy] => {
  const stepAppendParsedDataToNamedDataSet = createActionNode(
    huirthServerAppendParsedDataToNamedDataSet({
      name,
      type,
    })
  );
  const stepParseFile = createActionNode(huirthServerParseFileFromData(), {
    successNode: stepAppendParsedDataToNamedDataSet,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
  });
  const stepReadFileContents = createActionNode(fileSystemReadFileContentsAndAppendToData(), {
    successNode: stepParseFile,
  });
  return [
    stepAppendParsedDataToNamedDataSet,
    createStrategy({
      topic: 'READ, PARSE, AND APPEND STITCH',
      initialNode: stepReadFileContents,
    }),
  ];
};

export const [
  huirthServerDetermineReadParseAppendStrategy,
  huirthServerDetermineReadParseAppendStrategyType,
  huirthServerDetermineReadParseAppendStrategyQuality,
] = createQualityCardWithPayload<huirthServerDetermineReadParseAppendStrategyPayload>({
  type: 'huirthServer determine read, parse, and append strategy for the incoming raw data set',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodWithConcepts(
      (action, concepts) => {
        if (action.strategy && action.strategy.data) {
          const strategy = action.strategy;
          const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadFileContentsAndAppendToDataField;
          const { name, type } = selectPayload<huirthServerDetermineReadParseAppendStrategyPayload>(action);
          if (data.filesAndDirectories && data.filesAndDirectories.length > 0) {
            const filesAndDirectories = data.filesAndDirectories;
            const [end, start] = readAndParseStitch(name, type);
            let prevHead = end;
            for (let i = 1; i < filesAndDirectories.length; i++) {
              const [stitchEnd, stitchStrategy] = readAndParseStitch(name, type);
              const stitchHead = createActionNodeFromStrategy(stitchStrategy);
              prevHead.successNode = stitchHead;
              // console.log('PREV HEAD', prevHead, i);
              prevHead = stitchEnd;
              // console.log('STITCH HEAD', stitchHead, i);
            }
            const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(name);
            const strategyAdd = huirthAddTrainingDataPageStrategy(name, generatedTrainingDataPage, concepts) as ActionStrategy;
            prevHead.successNode = createActionNode(
              huirthServerPrepareParsedProjectDataUpdate({
                name,
              })
            );
            strategy.currentNode.successNode = createActionNodeFromStrategy(start);
            return strategySuccess(strategySequence([strategy, strategyAdd]) as ActionStrategy);
          } else {
            return strategyFailed(strategy, strategyData_appendFailure(strategy, 'No entries found in filesAndDirectories field'));
          }
        } else {
          return axiumConclude();
        }
      },
      concepts$,
      semaphore
    ),
});
/*#>*/
