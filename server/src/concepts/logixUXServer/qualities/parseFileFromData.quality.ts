/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that will parse the contents of a file supplied from the data field for a dataset set by payload.
$>*/
/*<#*/
import {
  ActionType,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_unifyData,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { BaseDataSet } from '../../logixUX/logixUX.model';
import { ReadFileContentsAndAppendToDataField } from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';
import { ParsingTokens } from '../logixUXServer.model';

export const logixUXServerParseFileFromDataType: ActionType =
  'logixUXServer parse file from data';
export const logixUXServerParseFileFromData =
  prepareActionCreator(logixUXServerParseFileFromDataType);
export type ParsedFileFromDataField = {
  parsed: BaseDataSet[]
}

const recursiveParse = (data: BaseDataSet[], content: string): BaseDataSet[] => {
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
    data.push({
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
      const strategy = action.strategy;
      const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadFileContentsAndAppendToDataField;
      if (data.filesAndDirectories && data.content) {
        // console.log('CHECK CONTENT', data.content);
        const parsed = recursiveParse([], data.content);
        // console.log('CHECK PARSE', parsed);
        controller.fire(strategySuccess(action.strategy, strategyData_unifyData(strategy, {
          parsed,
        })));
      } else {
        controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, 'No filesAndData field provided')))
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