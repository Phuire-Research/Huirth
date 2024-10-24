/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator that will unify Sidebar, DataManager, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createStrategy, Deck } from 'stratimux';
import {
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

export const huirthDataManagerPageStrategyTopic = 'dataManager';
export const huirthDataManagerPageStrategy: PageStrategyCreators = () => (deck: Deck<HuirthDeck>) => {
  const pageData = userInterface_createPage({
    title: huirthDataManagerPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: [],
    cachedComponentSelectors: [],
  });

  return userInterfaceCreatePageStrategy(
    huirthDataManagerPageStrategyTopic,
    pageData,
    [huirthSidebarComponentStitch, huirthDataManagerStrategyStitch, huirthFooterStitch],
    deck,
    huirthHeaderStitch
  );
};

export const huirthDataManagerStrategyStitchTopic = 'huirth Data Manager Action Strategy Component Stitch';
export const huirthDataManagerStrategyStitch: ActionStrategyComponentStitch<HuirthDeck> = (payload, deck) => {
  // Body
  const stephuirthDataManagerEnd = userInterface.createComponent(deck.huirth.e.huirthDataManagerEnd(payload));
  const stephuirthDataManagerContent = userInterface.createComponent(
    deck.huirth.e.huirthDataManagerContent(payload),
    stephuirthDataManagerEnd
  );
  const stephuirthDataManagerBegin = userInterface.createComponent(
    deck.huirth.e.huirthDataManagerBegin(payload),
    stephuirthDataManagerContent
  );
  return [
    stephuirthDataManagerEnd,
    createStrategy({
      topic: huirthDataManagerStrategyStitchTopic,
      initialNode: stephuirthDataManagerBegin,
    }),
  ];
};
/*#>*/
