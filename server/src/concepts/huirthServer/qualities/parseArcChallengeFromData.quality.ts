/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that will parse the contents of a file supplied from the data field for a dataset set by payload.
$>*/
/*<#*/
import {
  createAsyncMethod,
  createQualityCard,
  nullReducer,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_muxifyData,
  strategyFailed,
  strategySuccess,
  muxiumRegisterTimeOut,
  muxiumTimeOut,
  createAsyncMethodWithConcepts,
  strategyBegin,
  selectState,
  createQualityCardWithPayload,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { BaseDataSet, DataSetTypes } from '../../huirth/huirth.model';
import { ArcChallengeFormat, ParsingTokens } from '../huirthServer.model';
import { ReadAllFileContentsAndAppendToDataField } from '../../fileSystem/qualities/readAllFileContentsAndAppendToData.quality copy';
import { huirthServerSaveDataSetStrategy } from '../strategies/saveDataSet.strategy';
import { fileSystemName, FileSystemState } from '../../fileSystem/fileSystem.concept';
import { HuirthServerDeck, huirthServerState } from '../huirthServer.concept';

export type ArcChallengeParsedFileFromDataField = {
  parsed: BaseDataSet[];
};

export type huirthServerArcChallengeParseFileFromDataPayload = {
  name: string;
  type: DataSetTypes;
};

const parseArcChallenge = (data: BaseDataSet[], contents: string[]): BaseDataSet[] => {
  for (const content of contents) {
    const parsedData = JSON.parse(content) as ArcChallengeFormat;
    // console.log(content);
    const stack: {
      role: string;
      text: string;
    }[] = [];
    parsedData.train.forEach((entry) => {
      // console.log(entry);
      stack.push({
        role: 'user',
        text: JSON.stringify(entry.input),
      });
      stack.push({
        role: 'model',
        text: JSON.stringify(entry.output),
      });
    });
    parsedData.test.forEach((entry) => {
      stack.push({
        role: 'user',
        text: JSON.stringify(entry.input),
      });
      stack.push({
        role: 'model',
        text: JSON.stringify(entry.input),
      });
    });
    data.push({
      contents: stack,
    });
  }
  return data;
};

export const huirthServerArcChallengeParseFileFromData = createQualityCardWithPayload<
  huirthServerState,
  huirthServerArcChallengeParseFileFromDataPayload,
  HuirthServerDeck
>({
  type: 'huirthServer parse Arc Challenge from data',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethodWithConcepts(({ controller, action, concepts_, deck }) => {
      if (action.strategy && action.strategy.data) {
        const strategy = action.strategy;
        const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadAllFileContentsAndAppendToDataField;
        if (data.filesAndDirectories && data.contents) {
          // console.log('CHECK CONTENT', data.content);
          const parsed = parseArcChallenge([], data.contents);
          muxiumTimeOut(
            concepts_,
            () => {
              return strategyBegin(
                huirthServerSaveDataSetStrategy(
                  (selectState(concepts_, fileSystemName) as FileSystemState).root,
                  {
                    index: 0,
                    name: action.payload.name,
                    type: action.payload.type,
                    dataSet: parsed,
                  },
                  action.payload.name,
                  concepts_,
                  deck
                )
              );
            },
            0
          );
          controller.fire(
            strategySuccess(
              action.strategy,
              strategyData_muxifyData(strategy, {
                parsed,
              })
            )
          );
        } else {
          console.log('CHECK FAILURE', data.contents);
          controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, 'No filesAndData field provided')));
        }
      } else {
        controller.fire(action);
      }
    }, 50000),
});
/*#>*/
