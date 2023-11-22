/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that will generate a strategy to read, parse, and append to state the output of every FileDirent passed via the data field.
$>*/
/*<#*/
import {
  ActionNode,
  ActionStrategy,
  ActionType,
  createActionNode,
  createActionNodeFromStrategy,
  createMethod,
  createQuality,
  createStrategy,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_appendFailure,
  strategyData_select,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { ReadFileContentsAndAppendToDataField, fileSystemReadFileContentsAndAppendToData } from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';
import { logixUXServerParseFileFromData } from './parseFileFromData.quality';
import { logixUXServerPrepareParsedProjectDataUpdate } from './prepareUpdateParsedProjectData.quality';
import { logixUXServerAppendParsedDataToNamedDataSet } from './appendParsedDataToNamedDataSet.quality';

export type LogixUXServerDetermineReadParseAppendStrategyPayload = {
  name: string,
}
export const logixUXServerDetermineReadParseAppendStrategyType: ActionType =
  'logixUXServer determine read, parse, and append strategy for the incoming raw data set';
export const logixUXServerDetermineReadParseAppendStrategy =
  prepareActionWithPayloadCreator<LogixUXServerDetermineReadParseAppendStrategyPayload>(logixUXServerDetermineReadParseAppendStrategyType);

const readAndParseStitch = (name: string): [ActionNode, ActionStrategy] => {
  const stepAppendParsedDataToNamedDataSet = createActionNode(logixUXServerAppendParsedDataToNamedDataSet({
    name
  }), {
    successNode: null,
    failureNode: null
  });
  const stepParseFile = createActionNode(logixUXServerParseFileFromData(), {
    successNode: stepAppendParsedDataToNamedDataSet,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
  });
  const stepReadFileContents = createActionNode(fileSystemReadFileContentsAndAppendToData(), {
    successNode: stepParseFile,
    failureNode: null
  });
  return [
    stepAppendParsedDataToNamedDataSet,
    createStrategy({
      topic: 'READ, PARSE, AND APPEND STITCH',
      initialNode: stepReadFileContents
    })
  ];
};

const logixUXServerDetermineReadParseAppendStrategyMethodCreator = () =>
  createMethod((action) => {
    if (action.strategy && action.strategy.data) {
      const strategy = action.strategy;
      const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadFileContentsAndAppendToDataField;
      const { name } = selectPayload<LogixUXServerDetermineReadParseAppendStrategyPayload>(action);
      if (data.filesAndDirectories && data.filesAndDirectories.length > 0) {
        const filesAndDirectories = data.filesAndDirectories;
        const [
          end,
          start
        ] = readAndParseStitch(name);
        let prevHead = end;
        for (let i = 1; i < filesAndDirectories.length; i++) {
          const [
            stitchEnd,
            stitchStrategy
          ] = readAndParseStitch(name);
          const stitchHead = createActionNodeFromStrategy(stitchStrategy);
          prevHead.successNode = stitchHead;
          // console.log('PREV HEAD', prevHead, i);
          prevHead = stitchEnd;
          // console.log('STITCH HEAD', stitchHead, i);
        }
        prevHead.successNode = createActionNode(logixUXServerPrepareParsedProjectDataUpdate({
          name,
        }), {
          successNode: null,
          failureNode: null
        });
        strategy.currentNode.successNode = createActionNodeFromStrategy(start);
        return strategySuccess(strategy);
      } else {
        return strategyFailed(strategy, strategyData_appendFailure(strategy, 'No entries found in filesAndDirectories field'));
      }
    } else {
      return action;
    }
  });

export const logixUXServerDetermineReadParseAppendStrategyQuality = createQuality(
  logixUXServerDetermineReadParseAppendStrategyType,
  defaultReducer,
  logixUXServerDetermineReadParseAppendStrategyMethodCreator,
);
/*#>*/