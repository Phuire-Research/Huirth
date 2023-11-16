import { createActionNode, createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch, PageStrategyCreators, userInterface_createPage } from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStrategy } from '../components/footer.strategy';
import { logixUXHeaderStrategy } from '../components/header.strategy';
import { logixUXDataManagerBegin } from '../../qualities/components/dataManager/dataManagerBegin.quality';
import { logixUXDataManagerContent } from '../../qualities/components/dataManager/dataManagerContent.quality';
import { logixUXDataManagerEnd } from '../../qualities/components/dataManager/dataManagerEnd.quality';
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';

export const logixUXGeneratedTrainingDataPageStrategy = (pageTitle: string): PageStrategyCreators => {
  return () => () => {
    const pageData = userInterface_createPage({
      title: pageTitle,
      conceptAndProps: [{ name: 'helloWorld' }],
      cachedSelectors: [],
      compositions: [],
    });

    return userInterfaceCreatePageStrategy(
      pageTitle,
      pageData,
      [logixUXSidebarComponentStitch, logixUXGeneratedTrainingDataStrategyStitch, logixUXFooterStrategy],
      logixUXHeaderStrategy
    );
  };
};

export const logixUXGeneratedTrainingDataStrategyStitchTopic = 'logixUX Generated Training Data Strategy Stitch';
export const logixUXGeneratedTrainingDataStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  // Fill in the Universal Data Set Editor
  const stepLogixUXDataManagerEnd = createActionNode(logixUXDataManagerEnd(payload), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXDataManagerContent = createActionNode(logixUXDataManagerContent(payload), {
    successNode: stepLogixUXDataManagerEnd,
    failureNode: null,
  });
  const stepLogixUXDataManagerBegin = createActionNode(logixUXDataManagerBegin(payload), {
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
