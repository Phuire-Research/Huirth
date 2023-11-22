/*<$
For the framework Stratimux and a Concept logixUX, generate a Page Strategy Creator that will unify Sidebar, DataSet, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch, PageStrategyCreators, userInterface_createPage } from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStitch } from '../components/footer.strategy';
import { logixUXHeaderStitch } from '../components/header.strategy';
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';
import { logixUXDataSetEnd } from '../../qualities/components/dataSet/dataSetEnd.quality';
import { logixUXDataSetContent } from '../../qualities/components/dataSet/dataSetContent.quality';
import { logixUXDataSetBegin } from '../../qualities/components/dataSet/dataSetBegin.quality';

export const logixUXGeneratedTrainingDataPageStrategy = (pageTitle: string): PageStrategyCreators => {
  return () => () => {
    const pageData = userInterface_createPage({
      title: pageTitle,
      conceptAndProps: [],
      cachedSelectors: [],
      compositions: [],
    });

    return userInterfaceCreatePageStrategy(
      pageTitle,
      pageData,
      [logixUXSidebarComponentStitch, logixUXGeneratedTrainingDataStrategyStitch, logixUXFooterStitch],
      logixUXHeaderStitch
    );
  };
};

export const logixUXGeneratedTrainingDataStrategyStitchTopic = 'logixUX Generated Training Data Strategy Component Stitch';
export const logixUXGeneratedTrainingDataStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  // Fill in the Universal Data Set Editor
  const stepLogixUXDataManagerEnd = createActionNode(logixUXDataSetEnd(payload), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXDataManagerContent = createActionNode(logixUXDataSetContent(payload), {
    successNode: stepLogixUXDataManagerEnd,
    failureNode: null,
  });
  const stepLogixUXDataManagerBegin = createActionNode(logixUXDataSetBegin(payload), {
    successNode: stepLogixUXDataManagerContent,
    failureNode: null,
  });
  return [
    stepLogixUXDataManagerEnd,
    createStrategy({
      topic: `logixUX Generated ${payload.pageTitle} Training Data Strategy Stitch`,
      initialNode: stepLogixUXDataManagerBegin,
    }),
  ];
};
/*#>*/
