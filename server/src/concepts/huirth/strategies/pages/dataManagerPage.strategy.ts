/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator that will unify Sidebar, DataManager, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from '@phuire/stratimux';
import {
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface,
  userInterface_createPage,
} from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { huirthFooterStitch } from '../components/footer.strategy';
import { huirthHeaderStitch } from '../components/header.strategy';
import { huirthDataManagerBegin } from '../../qualities/components/dataManager/dataManagerBegin.quality';
import { huirthDataManagerContent } from '../../qualities/components/dataManager/dataManagerContent.quality';
import { huirthDataManagerEnd } from '../../qualities/components/dataManager/dataManagerEnd.quality';
import { huirthSidebarComponentStitch } from '../components/sidebar.strategy';

export const huirthDataManagerPageStrategyTopic = 'dataManager';
export const huirthDataManagerPageStrategy: PageStrategyCreators = () => () => {
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
    huirthHeaderStitch
  );
};

export const huirthDataManagerStrategyStitchTopic = 'huirth Data Manager Action Strategy Component Stitch';
export const huirthDataManagerStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  const stephuirthDataManagerEnd = userInterface.createComponent(huirthDataManagerEnd(payload));
  const stephuirthDataManagerContent = userInterface.createComponent(huirthDataManagerContent(payload), stephuirthDataManagerEnd);
  const stephuirthDataManagerBegin = userInterface.createComponent(huirthDataManagerBegin(payload), stephuirthDataManagerContent);
  return [
    stephuirthDataManagerEnd,
    createStrategy({
      topic: huirthDataManagerStrategyStitchTopic,
      initialNode: stephuirthDataManagerBegin,
    }),
  ];
};
/*#>*/
