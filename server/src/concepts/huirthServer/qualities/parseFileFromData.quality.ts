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
} from '@phuire/stratimux';
import { ReadDirectoryField } from '../../fileSystem/qualities/readDir.quality';
import { BaseDataSet } from '../../huirth/huirth.model';
import { ReadFileContentsAndAppendToDataField } from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';
import { ParsingTokens } from '../huirthServer.model';
import { FileDirent } from '../../fileSystem/fileSystem.model';

export type ParsedFileFromDataField = {
  parsed: BaseDataSet[];
};

const recurseExclude = (content: string, file: FileDirent): string => {
  const excludeBegin = content.indexOf(ParsingTokens.excludeBegin);
  if (excludeBegin !== -1) {
    const excludeEnd = content.indexOf(ParsingTokens.excludeEnd) + ParsingTokens.excludeEnd.length;
    if (excludeEnd !== -1) {
      const sliceBegin = content.substring(0, excludeBegin);
      const newContent = sliceBegin + content.substring(excludeEnd);
      const newExclude = newContent.indexOf(ParsingTokens.excludeBegin);
      if (newExclude !== -1 && newContent.length < content.length) {
        return recurseExclude(newContent, file);
      } else if (newContent.length < content.length) {
        return newContent;
      } else {
        console.error('PARSING ERROR @ ', file);
        return '';
      }
    } else {
      return content.substring(0, excludeBegin) + content.substring(excludeBegin + ParsingTokens.excludeBegin.length);
    }
  }
  return content;
};

const recursiveParse = (data: BaseDataSet[], content: string, file: FileDirent): BaseDataSet[] => {
  const index = content.indexOf(ParsingTokens.promptBegin);
  const stop = content.indexOf(ParsingTokens.stop);
  const stopExists = stop !== -1;
  const willStop = (i: number) => (stopExists ? i < stop : true);
  if (index !== -1 && willStop(index)) {
    let output = '';
    const promptBegin = index + ParsingTokens.promptBegin.length;
    const promptEnd = content.indexOf(ParsingTokens.promptEnd);
    const contentBegin = content.indexOf(ParsingTokens.contentBegin) + ParsingTokens.contentBegin.length;
    const contentEnd = content.indexOf(ParsingTokens.contentEnd);
    const importBegin = content.indexOf(ParsingTokens.importBegin);
    const includeBegin = content.indexOf(ParsingTokens.includeBegin);
    if (importBegin !== -1 && importBegin < contentEnd && willStop(contentEnd)) {
      const begin = importBegin + ParsingTokens.importBegin.length;
      const end = content.indexOf(ParsingTokens.importEnd);
      output += recurseExclude(content.substring(begin, end), file);
    }
    if (includeBegin !== -1 && includeBegin < contentEnd && willStop(contentEnd)) {
      const begin = includeBegin + ParsingTokens.includeBegin.length;
      const end = content.indexOf(ParsingTokens.includeEnd);
      output += content.substring(begin, end);
    }
    if (willStop(promptEnd)) {
      const prompt = content.substring(promptBegin, promptEnd).trim();
      output += recurseExclude(content.substring(contentBegin, contentEnd), file);
      output = output.trim();
      data.push({
        prompt,
        content: output,
      });
    }
    const sub = content.substring(contentEnd + ParsingTokens.contentEnd.length);
    const cont = sub.indexOf(ParsingTokens.promptBegin);
    if (cont !== -1 && willStop(cont)) {
      return recursiveParse(data, sub, file);
    }
  }
  return data;
};

export const huirthServerParseFileFromData = createQualityCard({
  type: 'huirthServer parse file from data',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod((controller, action) => {
      if (action.strategy && action.strategy.data) {
        const strategy = action.strategy;
        const data = strategyData_select(action.strategy) as ReadDirectoryField & ReadFileContentsAndAppendToDataField;
        if (data.filesAndDirectories && data.content) {
          // console.log('CHECK CONTENT', data.content);
          const parsed = recursiveParse([], data.content, data.dirent);
          // console.log('CHECK PARSE', parsed);
          controller.fire(
            strategySuccess(
              action.strategy,
              strategyData_muxifyData(strategy, {
                parsed,
              })
            )
          );
        } else {
          controller.fire(strategyFailed(strategy, strategyData_appendFailure(strategy, 'No filesAndData field provided')));
        }
      } else {
        controller.fire(action);
      }
    }),
});
/*#>*/
