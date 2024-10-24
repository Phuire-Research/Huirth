/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator that will unify Sidebar, DataSet, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck, MuxiumDeck } from 'stratimux';
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
import { HtmlDeck } from '../../../html/html.concepts';
import { HuirthDeck } from '../../huirth.concept';

export const huirthGeneratedTrainingDataPageStrategy = (pageTitle: string, deck: Deck<MuxiumDeck & HtmlDeck>): PageStrategyCreators => {
  const title = pageTitle;
  return () => () => {
    const pageData = userInterface_createPage({
      title,
      conceptAndProps: [],
      cachedSelectors: [],
      compositions: [],
      cachedComponentSelectors: [],
    });

    return userInterfaceCreatePageStrategy(
      title,
      pageData,
      [huirthSidebarComponentStitch, huirthGeneratedTrainingDataStrategyStitch, huirthFooterStitch],
      deck,
      huirthHeaderStitch
    );
  };
};

export const huirthGeneratedTrainingDataStrategyStitchTopic = 'huirth Generated Training Data Strategy Component Stitch';
export const huirthGeneratedTrainingDataStrategyStitch: ActionStrategyComponentStitch<HuirthDeck> = (payload, deck) => {
  const stephuirthDataSetEnd = userInterface.createComponent(deck.huirth.e.huirthDataSetEnd(payload));
  const stephuirthDataManagerContent = userInterface.createComponent(deck.huirth.e.huirthDataSetContent(payload), stephuirthDataSetEnd);
  const stephuirthDataSetBegin = userInterface.createComponent(deck.huirth.e.huirthDataSetBegin(payload), stephuirthDataManagerContent);
  return [
    stephuirthDataSetEnd,
    createStrategy({
      topic: `huirth Generated ${payload.pageTitle} Training Data Strategy Stitch`,
      initialNode: stephuirthDataSetBegin,
    }),
  ];
};
/*#>*/
