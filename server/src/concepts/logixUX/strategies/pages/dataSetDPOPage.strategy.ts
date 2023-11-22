/*<$
For the framework Stratimux and a Concept logixUX, generate a Page Strategy Creator that will unify Sidebar, DPO, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch, PageStrategyCreators, userInterface_createPage } from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStitch } from '../components/footer.strategy';
import { logixUXHeaderStitch } from '../components/header.strategy';
import { logixUXIndexDPOBegin } from '../../qualities/components/DPO/DPOBegin.quality';
import { logixUXIndexDPOContent } from '../../qualities/components/DPO/DPOContent.quality';
import { logixUXIndexDPOEnd } from '../../qualities/components/DPO/DPOEnd.quality';
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';

export const logixUXDataSetDPOPageStrategyTopic = 'dpo';
export const logixUXIndexPageStrategy: PageStrategyCreators = () => () => {
  const pageData = userInterface_createPage({
    title: logixUXDataSetDPOPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: []
  });

  return userInterfaceCreatePageStrategy(
    logixUXDataSetDPOPageStrategyTopic,
    pageData,
    [
      logixUXSidebarComponentStitch,
      logixUXIndexDPOStrategyStitch,
      logixUXFooterStitch
    ],
    logixUXHeaderStitch
  );
};

export const logixUXIndexDPOStrategyStitchTopic = 'logixUX Index Training Data Strategy Component Stitch';
export const logixUXIndexDPOStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  const stepLogixUXIndexDPOEnd = createActionNode(logixUXIndexDPOEnd(payload), {
    successNode: null,
    failureNode: null
  });
  const stepLogixUXIndexDPOContent = createActionNode(logixUXIndexDPOContent(payload), {
    successNode: stepLogixUXIndexDPOEnd,
    failureNode: null
  });
  const stepLogixUXIndexDPOBegin = createActionNode(logixUXIndexDPOBegin(payload), {
    successNode: stepLogixUXIndexDPOContent,
    failureNode: null
  });
  return [
    stepLogixUXIndexDPOEnd,
    createStrategy({
      topic: logixUXIndexDPOStrategyStitchTopic,
      initialNode: stepLogixUXIndexDPOBegin,
    })
  ];
};
/*#>*/