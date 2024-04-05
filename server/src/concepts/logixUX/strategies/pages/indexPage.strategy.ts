/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a Page Strategy Creator called index, that will unify Sidebar, Hero, Dialog, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { axium_createStitchNode, createStrategy } from 'stratimux';
import {
  ActionComponentPayload,
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface,
  userInterface_createPage
} from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStitch } from '../components/footer.strategy';
import { logixUXHeaderStitch } from '../components/header.strategy';
import { logixUXIndexHero } from '../../qualities/components/hero/indexHero.quality';
import { logixUXIndexDialogBegin } from '../../qualities/components/dialog/indexDialogBegin.quality';
import { logixUXIndexDialogContent } from '../../qualities/components/dialog/indexDialogContent.quality';
import { logixUXIndexDialogEnd } from '../../qualities/components/dialog/indexDialogEnd.quality';
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';

export const logixUXIndexPageStrategyTopic = 'index';
export const logixUXIndexPageStrategy: PageStrategyCreators = () => () => {
  const page: ActionComponentPayload = {
    pageTitle: logixUXIndexPageStrategyTopic,
  };
  const stepStitch = axium_createStitchNode();
  const stepLogixUXIndexHero = userInterface.createComponent(logixUXIndexHero(page), stepStitch);
  const logixUXBody: ActionStrategyComponentStitch = (payload: ActionComponentPayload) => [stepStitch, createStrategy({
    topic: 'Create logixUX Body Content',
    initialNode: stepLogixUXIndexHero,
  })];

  const pageData = userInterface_createPage({
    title: logixUXIndexPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: [],
    cachedComponentSelectors: []
  });

  return userInterfaceCreatePageStrategy(
    logixUXIndexPageStrategyTopic,
    pageData,
    [
      logixUXSidebarComponentStitch,
      logixUXBody,
      logixUXIndexDialogStrategyStitch,
      logixUXFooterStitch
    ],
    logixUXHeaderStitch
  );
};

export const logixUXIndexDialogStrategyStitchTopic = 'logixUX Index Dialog Strategy Component Stitch';
export const logixUXIndexDialogStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  const stepLogixUXIndexDialogEnd = userInterface.createComponent(logixUXIndexDialogEnd(payload));
  const stepLogixUXIndexDialogContent = userInterface.createComponent(logixUXIndexDialogContent(payload), stepLogixUXIndexDialogEnd);
  const stepLogixUXIndexDialogBegin = userInterface.createComponent(logixUXIndexDialogBegin(payload), stepLogixUXIndexDialogContent);
  return [
    stepLogixUXIndexDialogEnd,
    createStrategy({
      topic: logixUXIndexDialogStrategyStitchTopic,
      initialNode: stepLogixUXIndexDialogBegin,
    })
  ];
};
/*#>*/

// logixUXIndexDPOStrategyStitch
// export const logixUXIndexDPOStrategyStitchTopic = 'logixUX Index DPO Strategy Stitch';
// export const logixUXIndexDPOStrategyStitch: ActionStrategyComponentStitch = (payload) => {
//   // Body
//   const stepLogixUXIndexDPOEnd = userInterface.createComponent(logixUXIndexDPOEnd(payload), {
//     successNode: null,
//     failureNode: null
//   });
//   const stepLogixUXIndexDPOContent = userInterface.createComponent(logixUXIndexDPOContent(payload), {
//     successNode: stepLogixUXIndexDPOEnd,
//     failureNode: null
//   });
//   const stepLogixUXIndexDPOBegin = userInterface.createComponent(logixUXIndexDPOBegin(payload), {
//     successNode: stepLogixUXIndexDPOContent,
//     failureNode: null
//   });
//   return [
//     stepLogixUXIndexDPOEnd,
//     createStrategy({
//       topic: logixUXIndexDPOStrategyStitchTopic,
//       initialNode: stepLogixUXIndexDPOBegin,
//     })
//   ];
// };