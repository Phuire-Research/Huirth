/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a Page Strategy Creator that will unify Sidebar, DataSet, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
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
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';
import { logixUXDataSetEnd } from '../../qualities/components/dataSet/dataSetEnd.quality';
import { logixUXDataSetContent } from '../../qualities/components/dataSet/dataSetContent.quality';
import { logixUXDataSetBegin } from '../../qualities/components/dataSet/dataSetBegin.quality';

export const logixUXGeneratedTrainingDataPageStrategy = (pageTitle: string): PageStrategyCreators => {
  const title = pageTitle;
  return () => () => {
    const pageData = userInterface_createPage({
      title,
      conceptAndProps: [],
      cachedSelectors: [],
      compositions: []
    });

    return userInterfaceCreatePageStrategy(
      title,
      pageData,
      [
        logixUXSidebarComponentStitch,
        logixUXGeneratedTrainingDataStrategyStitch,
        logixUXFooterStitch
      ],
      logixUXHeaderStitch
    );
  };
};

export const logixUXGeneratedTrainingDataStrategyStitchTopic = 'logixUX Generated Training Data Strategy Component Stitch';
export const logixUXGeneratedTrainingDataStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  const stepLogixUXDataSetEnd = createActionNode(logixUXDataSetEnd(payload), {
    successNode: null,
    failureNode: null
  });
  const stepLogixUXDataManagerContent = createActionNode(logixUXDataSetContent(payload), {
    successNode: stepLogixUXDataSetEnd,
    failureNode: null
  });
  const stepLogixUXDataSetBegin = createActionNode(logixUXDataSetBegin(payload), {
    successNode: stepLogixUXDataManagerContent,
    failureNode: null
  });
  return [
    stepLogixUXDataSetEnd,
    createStrategy({
      topic: `logixUX Generated ${payload.pageTitle} Training Data Strategy Stitch`,
      initialNode: stepLogixUXDataSetBegin,
    })
  ];
};
/*#>*/