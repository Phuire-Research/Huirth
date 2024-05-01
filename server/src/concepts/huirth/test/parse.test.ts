/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a test that will ensure that parseFileFrom's parsing function is working as intended.
$>*/
/*<#*/
import { ParsingTokens } from '../../huirthServer/huirthServer.model';
import { BaseDataSet } from '../huirth.model';

const recurseExclude = (content: string): string => {
  const excludeBegin = content.indexOf(ParsingTokens.excludeBegin);
  if (excludeBegin !== -1) {
    const excludeEnd = content.indexOf(ParsingTokens.excludeEnd) + ParsingTokens.excludeEnd.length;
    if (excludeEnd !== -1) {
      const sliceBegin = content.substring(0, excludeBegin);
      const newContent = sliceBegin + content.substring(excludeEnd);
      const newExclude = newContent.indexOf(ParsingTokens.excludeBegin);
      if (newExclude !== -1) {
        return recurseExclude(newContent);
      } else {
        return newContent;
      }
    } else {
      return content.substring(0, excludeBegin) + content.substring(excludeBegin + ParsingTokens.excludeBegin.length);
    }
  }
  return content;
};

const recursiveParse = (data: BaseDataSet[], content: string): BaseDataSet[] => {
  const index = content.indexOf(ParsingTokens.promptBegin);
  const stop = content.indexOf(ParsingTokens.stop);
  const stopExists = stop !== -1;
  const willStop = (i: number) => stopExists ? i < stop : true;
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
      output += recurseExclude(content.substring(begin, end));
    }
    if (includeBegin !== -1 && includeBegin < contentEnd && willStop(contentEnd)) {
      const begin = includeBegin + ParsingTokens.includeBegin.length;
      const end = content.indexOf(ParsingTokens.includeEnd);
      output += content.substring(begin, end);
    }
    if (willStop(promptEnd)) {
      const prompt = content.substring(promptBegin, promptEnd).trim();
      output += recurseExclude(content.substring(contentBegin, contentEnd));
      output = output.trim();
      data.push({
        prompt,
        content: output
      });
    }
    const sub = content.substring(contentEnd + ParsingTokens.contentEnd.length);
    const cont = sub.indexOf(ParsingTokens.promptBegin);
    if (cont  !== -1 && willStop(cont)) {
      return recursiveParse(data, sub);
    }
  }
  return data;
};
/*<%
const createData = () => {
  return `
  This would be some data that exists beyond the stop point. But has be excluded due to parsing reasons.
  And would include a series of prompts bound with content. That tests whether the parsing system is working as intended.
`;
%>*/
test('userInterfaceBindingsToString', (done) => {
  const simulated = createData();
  const parsed = recursiveParse([], simulated);
  console.log(parsed);
  expect(parsed.length).toBe(2);
  done();
});
/*#>*/
/*<!!>*/
const createData = () => {
  return `
  /*<$
  For the graph programming framework Stratimux and a Concept huirth Server, generate the model file contents that will handle Data Sets, Failure Conditions, and Tokens.
  $>*/
  /*<#*/
  Something Here.
  /*<!*/
  // eslint-disable-next-line no-shadow
  Something shouldn't be here.
  /*!>*/
  Something Else Here.
  /*<@
  import {something} from './something.ts'
  @>*/
  /*<%
  This will be Include.
  %>*/
  Lorem
  /*<!*/
  ipsum
  /*!>*/
  dolor
  sit
  /*<!*/
  amet,
  consectetur
  adipiscing
  elit,
  sed
  do
  eiusmod
  tempor
  incididunt
  /*!>*/
  /*#>*/
  /*<$
  Some random prompt
  $>*/
  /*<#*/
  ut
  labore
  et
  dolore
  /*<!*/
  magna
  /*!>*/
  aliqua.
  
  /*#>*/
  /*<!!>*/
  // eslint-disable-next-line no-shadow
  export enum ParsingTokens {
    promptBegin = '/*<$',
    promptEnd = '$>*/',
    contentBegin = '/*<#*/',
    contentEnd = '/*#>*/',
    importBegin = '/*<@',
    importEnd = '@>*/',
    includeBegin = '/*<%',
    includeEnd = '%>*/',
    ignoreBegin = '/*<!*/',
    ignoreEnd = '/*!>*/'
  }
  `;
};