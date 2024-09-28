/*<$
For the graph programming framework Stratimux generate a HTML Concept.
$>*/
/*<#*/
import { createConcept, Concept } from '@phuire/stratimux';
import { htmlHelloWorld } from './qualities/helloWorld.quality';
import { htmlBegin } from './qualities/htmlBegin.quality';
import { htmlEnd } from './qualities/htmlEnd';
import { htmlBodyBegin } from './qualities/bodyBegin.quality';
import { htmlBodyEnd } from './qualities/bodyEnd.quality';
import { htmlHeadBegin } from './qualities/headBegin.quality';
import { htmlHeadEnd } from './qualities/headEnd.quality';

export const htmlName = 'html';

export type HtmlState = {
  //
};

const createHtmlState = (): HtmlState => {
  return {
    //
  };
};

export const createHtmlConcept = () => {
  return createConcept(htmlName, createHtmlState(), {
    htmlHelloWorld,
    htmlBegin,
    htmlEnd,
    htmlBodyBegin,
    htmlBodyEnd,
    htmlHeadBegin,
    htmlHeadEnd,
  });
};
/*#>*/
