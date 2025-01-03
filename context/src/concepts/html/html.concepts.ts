/*<$
For the graph programming framework Stratimux generate a HTML Concept.
$>*/
/*<#*/
import { createConcept, Concept } from 'stratimux';
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

const qualities = {
  htmlHelloWorld,
  htmlBegin,
  htmlEnd,
  htmlBodyBegin,
  htmlBodyEnd,
  htmlHeadBegin,
  htmlHeadEnd,
};

export type HtmlDeck = {
  html: Concept<HtmlState, typeof qualities>;
};

export const createHtmlConcept = () => {
  return createConcept(htmlName, createHtmlState(), qualities);
};
/*#>*/
