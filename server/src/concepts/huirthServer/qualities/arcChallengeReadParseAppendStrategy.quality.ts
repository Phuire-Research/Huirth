/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will generate a strategy to read, parse, and append to state the output of every FileDirent passed via the data field.
$>*/
/*<#*/
import {
  ActionNode,
  ActionStrategy,
  muxiumConclude,
  createActionNode,
  createActionNodeFromStrategy,
  createMethodWithConcepts,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  strategyData_appendFailure,
  strategyData_select,
  strategyFailed,
  strategySequence,
  strategySuccess,
  Deck,
  createQualityCard,
  selectState,
  strategyBegin,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { ReadFileContentsAndAppendToDataField } from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';
import { DataSetTypes } from '../../huirth/huirth.model';
import { huirthGeneratedTrainingDataPageStrategy } from '../../huirth/strategies/pages/generatedTrainingDataPage.strategy';
import { huirthAddTrainingDataPageStrategy } from '../../huirth/strategies/addPageTrainingData.strategy';
import { HuirthServerDeck, huirthServerState } from '../huirthServer.concept';
import { fileSystemName, FileSystemState } from '../../fileSystem/fileSystem.concept';
import { huirthServerExtractArcChallengeDataSetStrategy } from '../strategies/extractArcChallengeDataSet.strategy';

const readAndParseStitch = (name: string, type: DataSetTypes, deck: Deck<HuirthServerDeck>): [ActionNode, ActionStrategy] => {
  const stepAppendParsedDataToNamedDataSet = createActionNode(
    deck.huirthServer.e.huirthServerAppendParsedDataToNamedDataSet({
      name,
      type,
    })
  );
  const stepParseFile = createActionNode(deck.huirthServer.e.huirthServerArcChallengeParseFileFromData(), {
    successNode: stepAppendParsedDataToNamedDataSet,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
  });
  const stepReadFileContents = createActionNode(deck.fileSystem.e.fileSystemReadFileContentsAndAppendToData(), {
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

export const huirthServerArcChallengeReadParseAppendStrategy = createQualityCard<huirthServerState, HuirthServerDeck>({
  type: 'huirthServer Arc Challenge read, parse, and append strategy for the incoming raw data set',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodWithConcepts(({ action, concepts_, deck }) => {
      console.log('HIT ARC CHALLENGE GENERATION', action);
      // const strategy = action.strategy;
      // const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadFileContentsAndAppendToDataField;
      // const name = 'ArcChallengeTraining';
      // const type = DataSetTypes.general;
      // if (data.filesAndDirectories && data.filesAndDirectories.length > 0) {
      //   const filesAndDirectories = data.filesAndDirectories;
      //   const [end, start] = readAndParseStitch(name, type, deck);
      //   let prevHead = end;
      //   for (let i = 1; i < filesAndDirectories.length; i++) {
      //     const [stitchEnd, stitchStrategy] = readAndParseStitch(name, type, deck);
      //     const stitchHead = createActionNodeFromStrategy(stitchStrategy);
      //     prevHead.successNode = stitchHead;
      //     // console.log('PREV HEAD', prevHead, i);
      //     prevHead = stitchEnd;
      //     // console.log('STITCH HEAD', stitchHead, i);
      //   }
      //   const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(name, deck);
      //   const strategyAdd = huirthAddTrainingDataPageStrategy(name, generatedTrainingDataPage, concepts_, deck) as ActionStrategy;
      //   prevHead.successNode = createActionNode(
      //     deck.huirthServer.e.huirthServerPrepareParsedProjectDataUpdate({
      //       name,
      //     })
      //   );
      //   strategy.currentNode.successNode = createActionNodeFromStrategy(start);
      //   return strategySuccess(strategySequence([strategy, strategyAdd]) as ActionStrategy);
      // } else {
      //   return strategyFailed(strategy, strategyData_appendFailure(strategy, 'No entries found in filesAndDirectories field'));
      // }
      const fileSystemState = selectState<FileSystemState>(concepts_, fileSystemName);
      if (fileSystemState) {
        const act = strategyBegin(huirthServerExtractArcChallengeDataSetStrategy(fileSystemState.root, deck));
        return act;
      }
      return muxiumConclude();
    }),
});
/*#>*/
