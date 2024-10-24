/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator that will unify Sidebar, Error, Footer, and Header Action Strategy Component Stitches into a Page Composition.
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
import { huirthError } from '../../qualities/components/error/error.quality';
import { huirthFooterStitch } from '../components/footer.strategy';
import { huirthHeaderStitch } from '../components/header.strategy';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { huirthSidebarComponentStitch } from '../components/sidebar.strategy';
import { HuirthDeck } from '../../huirth.concept';

export const huirthErrorPageStrategyTopic = 'error';
export const huirthErrorPageStrategy: PageStrategyCreators = () => (deck: Deck<HuirthDeck>) => {
  const page: ActionComponentPayload = {
    pageTitle: huirthErrorPageStrategyTopic,
  };
  // Body
  const stepStitch = muxium_createStitchNode(deck);
  const stephuirthError = userInterface.createComponent(deck.huirth.e.huirthError(page), stepStitch);
  const huirthErrorStitch: ActionStrategyComponentStitch = () => [
    stepStitch,
    createStrategy({
      topic: 'Create huirth Error Body Content',
      initialNode: stephuirthError,
    }),
  ];

  const pageData = userInterface_createPage({
    title: huirthErrorPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: [],
    cachedComponentSelectors: [],
  });

  return userInterfaceCreatePageStrategy(
    huirthErrorPageStrategyTopic,
    pageData,
    [huirthSidebarComponentStitch, huirthErrorStitch, huirthFooterStitch],
    deck,
    huirthHeaderStitch
  );
};
