/*<$
For the graph programming framework Stratimux generate a HTML Concept.
$>*/
/*<#*/
import { createConcept, Concept } from 'stratimux';
import { htmlHelloWorldQuality } from './qualities/helloWorld.quality';
import { htmlBeginQuality } from './qualities/htmlBegin.quality';
import { htmlEndQuality } from './qualities/htmlEnd';
import { htmlBodyBeginQuality } from './qualities/bodyBegin.quality';
import { htmlBodyEndQuality } from './qualities/bodyEnd.quality';
import { htmlHeadBeginQuality } from './qualities/headBegin.quality';
import { htmlHeadEndQuality } from './qualities/headEnd.quality';

export const htmlName = 'html';

export type HtmlState = {
  //
};

const createHtmlState = (): HtmlState => {
  return {
    //
  };
};

export const createHtmlConcept = (): Concept => {
  return createConcept(htmlName, createHtmlState(), [
    htmlHelloWorldQuality,
    htmlBeginQuality,
    htmlEndQuality,
    htmlBodyBeginQuality,
    htmlBodyEndQuality,
    htmlHeadBeginQuality,
    htmlHeadEndQuality,
  ]);
};
/*#>*/
