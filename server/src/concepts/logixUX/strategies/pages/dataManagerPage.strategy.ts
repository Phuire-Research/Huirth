/*<$*/
// PROMPT: For the framework Stratimux and a Concept logixUX, generate a Page Strategy Creator that will unify Sidebar, DataManager, Footer, and Header Action Strategy Component Stitches into a Page Composition.
/*$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import {
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface_createPage
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
    compositions: []
  });

  return userInterfaceCreatePageStrategy(
    logixUXDataManagerPageStrategyTopic,
    pageData,
    [
      logixUXSidebarComponentStitch,
      logixUXDataManagerStrategyStitch,
      logixUXFooterStitch
    ],
    logixUXHeaderStitch
  );
};

export const logixUXDataManagerStrategyStitchTopic = 'logixUX Data Manager Action Strategy Component Stitch';
export const logixUXDataManagerStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  const stepLogixUXDataManagerEnd = createActionNode(logixUXDataManagerEnd(payload), {
    successNode: null,
    failureNode: null
  });
  const stepLogixUXDataManagerContent = createActionNode(logixUXDataManagerContent(payload), {
    successNode: stepLogixUXDataManagerEnd,
    failureNode: null
  });
  const stepLogixUXDataManagerBegin = createActionNode(logixUXDataManagerBegin(payload), {
    successNode: stepLogixUXDataManagerContent,
    failureNode: null
  });
  return [
    stepLogixUXDataManagerEnd,
    createStrategy({
      topic: logixUXDataManagerStrategyStitchTopic,
      initialNode: stepLogixUXDataManagerBegin,
    })
  ];
};
/*#>*/