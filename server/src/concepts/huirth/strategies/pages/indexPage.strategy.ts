/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator called index, that will unify Sidebar, Hero, Dialog, Footer, and Header Action Strategy Component Stitches into a Page Composition.
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
import { huirthFooterStitch } from '../components/footer.strategy';
import { huirthHeaderStitch } from '../components/header.strategy';
import { huirthIndexHero } from '../../qualities/components/hero/indexHero.quality';
import { huirthIndexDialogBegin } from '../../qualities/components/dialog/indexDialogBegin.quality';
import { huirthIndexDialogContent } from '../../qualities/components/dialog/indexDialogContent.quality';
import { huirthIndexDialogEnd } from '../../qualities/components/dialog/indexDialogEnd.quality';
import { huirthSidebarComponentStitch } from '../components/sidebar.strategy';

export const huirthIndexPageStrategyTopic = 'index';
export const huirthIndexPageStrategy: PageStrategyCreators = () => () => {
  const page: ActionComponentPayload = {
    pageTitle: huirthIndexPageStrategyTopic,
  };
  const stepStitch = axium_createStitchNode();
  const stephuirthIndexHero = userInterface.createComponent(huirthIndexHero(page), stepStitch);
  const huirthBody: ActionStrategyComponentStitch = (payload: ActionComponentPayload) => [stepStitch, createStrategy({
    topic: 'Create huirth Body Content',
    initialNode: stephuirthIndexHero,
  })];

  const pageData = userInterface_createPage({
    title: huirthIndexPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: [],
    cachedComponentSelectors: []
  });

  return userInterfaceCreatePageStrategy(
    huirthIndexPageStrategyTopic,
    pageData,
    [
      huirthSidebarComponentStitch,
      huirthBody,
      huirthIndexDialogStrategyStitch,
      huirthFooterStitch
    ],
    huirthHeaderStitch
  );
};

export const huirthIndexDialogStrategyStitchTopic = 'huirth Index Dialog Strategy Component Stitch';
export const huirthIndexDialogStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  const stephuirthIndexDialogEnd = userInterface.createComponent(huirthIndexDialogEnd(payload));
  const stephuirthIndexDialogContent = userInterface.createComponent(huirthIndexDialogContent(payload), stephuirthIndexDialogEnd);
  const stephuirthIndexDialogBegin = userInterface.createComponent(huirthIndexDialogBegin(payload), stephuirthIndexDialogContent);
  return [
    stephuirthIndexDialogEnd,
    createStrategy({
      topic: huirthIndexDialogStrategyStitchTopic,
      initialNode: stephuirthIndexDialogBegin,
    })
  ];
};
/*#>*/

// huirthIndexDPOStrategyStitch
// export const huirthIndexDPOStrategyStitchTopic = 'huirth Index DPO Strategy Stitch';
// export const huirthIndexDPOStrategyStitch: ActionStrategyComponentStitch = (payload) => {
//   // Body
//   const stephuirthIndexDPOEnd = userInterface.createComponent(huirthIndexDPOEnd(payload), {
//     successNode: null,
//     failureNode: null
//   });
//   const stephuirthIndexDPOContent = userInterface.createComponent(huirthIndexDPOContent(payload), {
//     successNode: stephuirthIndexDPOEnd,
//     failureNode: null
//   });
//   const stephuirthIndexDPOBegin = userInterface.createComponent(huirthIndexDPOBegin(payload), {
//     successNode: stephuirthIndexDPOContent,
//     failureNode: null
//   });
//   return [
//     stephuirthIndexDPOEnd,
//     createStrategy({
//       topic: huirthIndexDPOStrategyStitchTopic,
//       initialNode: stephuirthIndexDPOBegin,
//     })
//   ];
// };