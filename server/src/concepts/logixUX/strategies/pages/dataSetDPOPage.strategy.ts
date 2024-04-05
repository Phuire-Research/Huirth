/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a Page Strategy Creator that will unify Sidebar, DPO, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch, PageStrategyCreators, userInterface, userInterface_createPage } from '../../../../model/userInterface';
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
    cachedComponentSelectors: [],
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
  const stepLogixUXIndexDPOEnd = userInterface.createComponent(logixUXIndexDPOEnd(payload));
  const stepLogixUXIndexDPOContent = userInterface.createComponent(logixUXIndexDPOContent(payload), stepLogixUXIndexDPOEnd);
  const stepLogixUXIndexDPOBegin = userInterface.createComponent(logixUXIndexDPOBegin(payload), stepLogixUXIndexDPOContent);
  return [
    stepLogixUXIndexDPOEnd,
    createStrategy({
      topic: logixUXIndexDPOStrategyStitchTopic,
      initialNode: stepLogixUXIndexDPOBegin,
    })
  ];
};
/*#>*/