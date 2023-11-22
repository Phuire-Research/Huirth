/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that will parse the contents of a file supplied from the data field for a dataset set by payload.
$>*/
/*<#*/
import {
  ActionType,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_select,
  strategySuccess,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { NamedDataSet, TrainingData, generateDefaultNamedDataSet } from '../../logixUX/logixUX.model';
import { ReadFileContentsAndAppendToDataField } from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';
import { ParsingTokens } from '../logixUXServer.model';

export type LogixUXServerParseFileFromDataPayload = {
  dataSetName: string,
}
export const logixUXServerParseFileFromDataType: ActionType =
  'logixUXServer parse file from data';
export const logixUXServerParseFileFromData =
  prepareActionWithPayloadCreator<LogixUXServerParseFileFromDataPayload>(logixUXServerParseFileFromDataType);
export type ParseFileFromDataField = {
  trainingData: TrainingData
}

const recursiveParse = (data: NamedDataSet, content: string): NamedDataSet => {
  const index = content.indexOf(ParsingTokens.promptBegin);
  if (index !== -1) {
    let output = '';
    const promptBegin = index + ParsingTokens.promptBegin.length;
    const promptEnd = content.indexOf(ParsingTokens.promptEnd);
    const contentBegin = content.indexOf(ParsingTokens.contentBegin) + ParsingTokens.contentBegin.length;
    const contentEnd = content.indexOf(ParsingTokens.contentEnd);
    const importBegin = content.indexOf(ParsingTokens.importBegin);
    const includeBegin = content.indexOf(ParsingTokens.includeBegin);
    if (importBegin !== -1 && importBegin < contentEnd) {
      const begin = importBegin + ParsingTokens.importBegin.length;
      const end = content.indexOf(ParsingTokens.importEnd);
      output += content.substring(begin, end);
    }
    if (includeBegin !== -1 && includeBegin < contentEnd) {
      const begin = includeBegin + ParsingTokens.includeBegin.length;
      const end = content.indexOf(ParsingTokens.includeEnd);
      output += content.substring(begin, end);
    }
    const prompt = content.substring(promptBegin, promptEnd);
    output += content.substring(contentBegin, contentEnd);
    data.dataSet.push({
      prompt,
      content: output
    });
    const sub = content.substring(contentEnd + ParsingTokens.contentEnd.length);
    const cont = sub.indexOf(ParsingTokens.promptBegin) !== -1;
    if (cont) {
      return recursiveParse(data, sub);
    }
  }
  return data;
};

const logixUXServerParseFileFromDataMethodCreator = () =>
  createAsyncMethod((controller, action) => {
    if (action.strategy && action.strategy.data) {
      const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadFileContentsAndAppendToDataField;
      const { dataSetName } = selectPayload<LogixUXServerParseFileFromDataPayload>(action);
      if (data.filesAndDirectories) {
        const dataSet = generateDefaultNamedDataSet(dataSetName);
        console.log('CHECK PARSE', recursiveParse(dataSet, data.content));
        controller.fire(strategySuccess(action.strategy));
        // FIGURE OUT DIRENT
        // if (data.directories.length !== 0) {
        //   const contents = fs.readFileSync(path.join(data.directories[0].path + '/' + data.directories[0].name));
        //   try {
        //     const trainingData = JSON.parse(`${contents}`);
        //     controller.fire(strategySuccess(action.strategy, strategyData_unifyData(action.strategy, {
        //     // TEMP
        //       trainingData,
        //     })));
        //   } catch (error) {
        //     controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(
        //       action.strategy,
        //       logixUXServerFailureConditions.failedParsingTrainingData
        //     )));
        //   }
        // } else {
        //   controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(
        //     action.strategy,
        //     logixUXServerFailureConditions.noTrainingData
        //   )));
        // }
      }
    } else {
      controller.fire(action);
    }
  });

export const logixUXServerParseFileFromDataQuality = createQuality(
  logixUXServerParseFileFromDataType,
  defaultReducer,
  logixUXServerParseFileFromDataMethodCreator,
);
/*#>*/