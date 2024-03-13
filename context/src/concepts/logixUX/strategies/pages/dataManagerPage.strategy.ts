/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a Page Strategy Creator that will unify Sidebar, DataManager, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import {
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface,
  userInterface_createPage,
} from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStitch } from '../components/footer.strategy';
import { logixUXHeaderStitch } from '../components/header.strategy';
import { logixUXDataManagerBegin } from '../../qualities/components/dataManager/dataManagerBegin.quality';
import { logixUXDataManagerContent } from '../../qualities/components/dataManager/dataManagerContent.quality';
import { logixUXDataManagerEnd } from '../../qualities/components/dataManager/dataManagerEnd.quality';
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';

export const logixUXDataManagerPageStrategyTopic = 'dataManager';
export const logixUXDataManagerPageStrategy: PageStrategyCreators = () => () => {
  const pageData = userInterface_createPage({
    title: logixUXDataManagerPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: [],
    cachedComponentSelectors: [],
  });

  return userInterfaceCreatePageStrategy(
    logixUXDataManagerPageStrategyTopic,
    pageData,
    [logixUXSidebarComponentStitch, logixUXDataManagerStrategyStitch, logixUXFooterStitch],
    logixUXHeaderStitch
  );
};

export const logixUXDataManagerStrategyStitchTopic = 'logixUX Data Manager Action Strategy Component Stitch';
export const logixUXDataManagerStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  const stepLogixUXDataManagerEnd = userInterface.createComponent(logixUXDataManagerEnd(payload));
  const stepLogixUXDataManagerContent = userInterface.createComponent(logixUXDataManagerContent(payload), stepLogixUXDataManagerEnd);
  const stepLogixUXDataManagerBegin = userInterface.createComponent(logixUXDataManagerBegin(payload), stepLogixUXDataManagerContent);
  return [
    stepLogixUXDataManagerEnd,
    createStrategy({
      topic: logixUXDataManagerStrategyStitchTopic,
      initialNode: stepLogixUXDataManagerBegin,
    }),
  ];
};
/*#>*/
