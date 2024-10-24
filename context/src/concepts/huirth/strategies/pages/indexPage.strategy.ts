/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator called index, that will unify Sidebar, Hero, Dialog, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { muxium_createStitchNode, createStrategy, Deck } from 'stratimux';
import {
  ActionComponentPayload,
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface,
  userInterface_createPage,
} from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { huirthFooterStitch } from '../components/footer.strategy';
import { huirthHeaderStitch } from '../components/header.strategy';
import { huirthSidebarComponentStitch } from '../components/sidebar.strategy';
import { HuirthDeck } from '../../huirth.concept';

export const huirthIndexPageStrategyTopic = 'index';
export const huirthIndexPageStrategy: PageStrategyCreators = () => (deck: Deck<HuirthDeck>) => {
  const page: ActionComponentPayload = {
    pageTitle: huirthIndexPageStrategyTopic,
  };
  const stepStitch = muxium_createStitchNode(deck);
  const stephuirthIndexHero = userInterface.createComponent(deck.huirth.e.huirthIndexHero(page), stepStitch);
  const huirthBody: ActionStrategyComponentStitch = (payload: ActionComponentPayload) => [
    stepStitch,
    createStrategy({
      topic: 'Create huirth Body Content',
      initialNode: stephuirthIndexHero,
    }),
  ];

  const pageData = userInterface_createPage({
    title: huirthIndexPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: [],
    cachedComponentSelectors: [],
  });

  return userInterfaceCreatePageStrategy(
    huirthIndexPageStrategyTopic,
    pageData,
    [huirthSidebarComponentStitch, huirthBody, huirthIndexDialogStrategyStitch, huirthFooterStitch],
    deck,
    huirthHeaderStitch
  );
};

export const huirthIndexDialogStrategyStitchTopic = 'huirth Index Dialog Strategy Component Stitch';
export const huirthIndexDialogStrategyStitch: ActionStrategyComponentStitch<HuirthDeck> = (payload, deck) => {
  // Body
  const stephuirthIndexDialogEnd = userInterface.createComponent(deck.huirth.e.huirthIndexDialogEnd(payload));
  const stephuirthIndexDialogContent = userInterface.createComponent(
    deck.huirth.e.huirthIndexDialogContent(payload),
    stephuirthIndexDialogEnd
  );
  const stephuirthIndexDialogBegin = userInterface.createComponent(
    deck.huirth.e.huirthIndexDialogBegin(payload),
    stephuirthIndexDialogContent
  );
  return [
    stephuirthIndexDialogEnd,
    createStrategy({
      topic: huirthIndexDialogStrategyStitchTopic,
      initialNode: stephuirthIndexDialogBegin,
    }),
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
