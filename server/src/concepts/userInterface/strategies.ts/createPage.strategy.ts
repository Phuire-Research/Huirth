import {
  ActionNode,
  ActionStrategy,
  ActionStrategyStitch,
  createActionNode,
  createActionNodeFromStrategy,
  createStrategy
} from 'stratimux';
import { Page } from '../../../model/userInterface';
import { htmlBegin } from '../../html/qualities/htmlBegin.quality';
import { htmlHeadBegin } from '../../html/qualities/headBegin.quality';
import { htmlBodyBegin } from '../../html/qualities/bodyBegin.quality';
import { htmlBodyEnd } from '../../html/qualities/bodyEnd.quality';
import { htmlEnd } from '../../html/qualities/htmlEnd';
import { htmlHeadEnd } from '../../html/qualities/headEnd.quality';

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
  topic: string,
  pageData: Page,
  body: ActionStrategyStitch[],
  headerStitch?: ActionStrategyStitch,
  language?: string
): [ActionNode, ActionStrategy] {
  const stepHtmlEnd = createActionNode(htmlEnd(), {
    successNode: null,
    failureNode: null
  });

  const stepBodyEnd = createActionNode(htmlBodyEnd(), {
    successNode: stepHtmlEnd,
    failureNode: null
  });

  const stepBodyBegin = createActionNode(htmlBodyBegin({pageName: pageData.title}), {
    successNode: stepBodyEnd,
    failureNode: null
  });

  let prevHead = stepBodyBegin;
  for (let i = 0; i < body.length; i++) {
    const [
      stitchEnd,
      stitchStrategy
    ] = body[i]();
    const stitchHead = createActionNodeFromStrategy(stitchStrategy);
    prevHead.successNode = stitchHead;
    // console.log('PREV HEAD', prevHead, i);
    prevHead = stitchEnd;
    // console.log('STITCH HEAD', stitchHead, i);
  }
  prevHead.successNode = stepBodyEnd;
  // console.log('FINAL', prevHead);

  const [
    headEnd,
    header
  ] = createHeaderStrategy(headerStitch);
  const stepHeader = createActionNodeFromStrategy(header);

  headEnd.successNode = stepBodyBegin;

  const stepHtmlBegin = createActionNode(htmlBegin({language}), {
    successNode: stepHeader,
    failureNode: null,
  });

  return [
    stepHtmlEnd,
    createStrategy({
      topic,
      initialNode: stepHtmlBegin,
      data: pageData
    })
  ];
}

const createHeaderStrategy = (stitch?: ActionStrategyStitch): [ActionNode, ActionStrategy] => {
  const stepHeadEnd = createActionNode(htmlHeadEnd(), {
    successNode: null,
    failureNode: null
  });
  const stepHeadBegin = createActionNode(htmlHeadBegin(), {
    successNode: stepHeadEnd,
    failureNode: null
  });
  if (stitch) {
    const [
      stitchEnd,
      stitchStrategy
    ] = stitch();
    stitchEnd.successNode = stepHeadEnd;
    const stitched = createActionNodeFromStrategy(stitchStrategy);
    stepHeadBegin.successNode = stitched;
  }
  return [
    stepHeadEnd,
    createStrategy({
      topic: 'Header Strategy',
      initialNode: stepHeadBegin,
    })
  ];
};
