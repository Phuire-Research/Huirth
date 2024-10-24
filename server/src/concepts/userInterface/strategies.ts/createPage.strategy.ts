/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a ActionStrategy that will generate a page based on its loaded action strategy stitch components and assign such to the strategies data field.
$>*/
/*<#*/
import { ActionNode, ActionStrategy, createActionNode, createActionNodeFromStrategy, createStrategy, Deck, MuxiumDeck } from 'stratimux';
import { ActionComponentPayload, ActionStrategyComponentStitch, Page } from '../../../model/userInterface';
import { HtmlDeck } from '../../html/html.concepts';

export const userInterfaceCreatePageTopic = 'User Interface create Page Strategy';
/**
 * Returns a Strategy with Data that must be handled by a final strategy
 *  This approach allows us to atomically edit each composition based on their keyedSelector on client and server.
 * @param title - Denotes the working composition page title
 * @param body - Is an array of StrategyStitches that create their own compositions that can be added to the body.
 * @param headerStitch - Any extra header compositions including style and script.
 * @param language - The language of your page, defaults to english.
 * @returns [ActionNode, ActionStrategy] ActionStrategy with data of type Composition
 */
export function userInterfaceCreatePageStrategy(
  title: string,
  pageData: Page,
  body: ActionStrategyComponentStitch<any>[],
  deck: Deck<MuxiumDeck & HtmlDeck>,
  headerStitch?: ActionStrategyComponentStitch<any>,
  language?: string
): [ActionNode, ActionStrategy] {
  const { htmlEnd, htmlBodyBegin, htmlBodyEnd } = deck.html.e;
  const payload: ActionComponentPayload = {
    pageTitle: title,
  };
  const stepHtmlEnd = createActionNode(htmlEnd(payload), {
    successNode: null,
    failureNode: null,
  });

  const stepBodyEnd = createActionNode(htmlBodyEnd(payload), {
    successNode: stepHtmlEnd,
    failureNode: null,
  });

  const stepBodyBegin = createActionNode(htmlBodyBegin(payload), {
    successNode: stepBodyEnd,
    failureNode: null,
  });

  let prevHead = stepBodyBegin;
  for (let i = 0; i < body.length; i++) {
    const [stitchEnd, stitchStrategy] = body[i](payload, deck);
    const stitchHead = createActionNodeFromStrategy(stitchStrategy);
    prevHead.successNode = stitchHead;
    // console.log('PREV HEAD', prevHead, i);
    prevHead = stitchEnd;
    // console.log('STITCH HEAD', stitchHead, i);
  }
  prevHead.successNode = stepBodyEnd;
  // console.log('FINAL', prevHead);

  const [headEnd, header] = createHeaderStrategy(payload, deck, headerStitch);
  const stepHeader = createActionNodeFromStrategy(header);

  headEnd.successNode = stepBodyBegin;

  const stepHtmlBegin = createActionNode(deck.html.e.htmlBegin({ language, pageTitle: title }), {
    successNode: stepHeader,
    failureNode: null,
  });

  return [
    stepHtmlEnd,
    createStrategy({
      topic: title,
      initialNode: stepHtmlBegin,
      data: pageData,
    }),
  ];
}

const createHeaderStrategy = (
  payload: ActionComponentPayload,
  deck: Deck<MuxiumDeck & HtmlDeck>,
  stitch?: ActionStrategyComponentStitch
): [ActionNode, ActionStrategy] => {
  const { htmlHeadBegin, htmlHeadEnd } = deck.html.e;

  const stepHeadEnd = createActionNode(htmlHeadEnd(payload), {
    successNode: null,
    failureNode: null,
  });
  const stepHeadBegin = createActionNode(htmlHeadBegin(payload), {
    successNode: stepHeadEnd,
    failureNode: null,
  });
  if (stitch) {
    const [stitchEnd, stitchStrategy] = stitch(payload, deck);
    stitchEnd.successNode = stepHeadEnd;
    const stitched = createActionNodeFromStrategy(stitchStrategy);
    stepHeadBegin.successNode = stitched;
  }
  return [
    stepHeadEnd,
    createStrategy({
      topic: 'Header Strategy',
      initialNode: stepHeadBegin,
    }),
  ];
};
/*#>*/
