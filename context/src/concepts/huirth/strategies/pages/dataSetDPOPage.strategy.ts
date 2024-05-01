/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator that will unify Sidebar, DPO, Footer, and Header Action Strategy Component Stitches into a Page Composition.
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
import { huirthFooterStitch } from '../components/footer.strategy';
import { huirthHeaderStitch } from '../components/header.strategy';
import { huirthIndexDPOBegin } from '../../qualities/components/DPO/DPOBegin.quality';
import { huirthIndexDPOContent } from '../../qualities/components/DPO/DPOContent.quality';
import { huirthIndexDPOEnd } from '../../qualities/components/DPO/DPOEnd.quality';
import { huirthSidebarComponentStitch } from '../components/sidebar.strategy';

export const huirthDataSetDPOPageStrategyTopic = 'dpo';
export const huirthIndexPageStrategy: PageStrategyCreators = () => () => {
  const pageData = userInterface_createPage({
    title: huirthDataSetDPOPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    cachedComponentSelectors: [],
    compositions: [],
  });

  return userInterfaceCreatePageStrategy(
    huirthDataSetDPOPageStrategyTopic,
    pageData,
    [huirthSidebarComponentStitch, huirthIndexDPOStrategyStitch, huirthFooterStitch],
    huirthHeaderStitch
  );
};

export const huirthIndexDPOStrategyStitchTopic = 'huirth Index Training Data Strategy Component Stitch';
export const huirthIndexDPOStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  const stephuirthIndexDPOEnd = userInterface.createComponent(huirthIndexDPOEnd(payload));
  const stephuirthIndexDPOContent = userInterface.createComponent(huirthIndexDPOContent(payload), stephuirthIndexDPOEnd);
  const stephuirthIndexDPOBegin = userInterface.createComponent(huirthIndexDPOBegin(payload), stephuirthIndexDPOContent);
  return [
    stephuirthIndexDPOEnd,
    createStrategy({
      topic: huirthIndexDPOStrategyStitchTopic,
      initialNode: stephuirthIndexDPOBegin,
    }),
  ];
};
/*#>*/
