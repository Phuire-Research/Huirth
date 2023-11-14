import { ActionStrategyStitch, axium_createStitchNode, createActionNode, createActionNodeFromStrategy, createStrategy } from 'stratimux';
import { PageStrategyCreators, userInterface_createPage } from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStrategy } from '../components/footer.strategy';
import { logixUXHeaderStrategy } from '../components/header.strategy';
import { logixUXIndexHero } from '../../qualities/index/indexHero.quality';
import { logixUXIndexDialogBegin } from '../../qualities/index/dialog/indexDialogBegin.quality';
import { logixUXIndexDialogContent } from '../../qualities/index/dialog/indexDialogContent.quality';
import { logixUXIndexDialogEnd } from '../../qualities/index/dialog/indexDialogEnd.quality';
import { logixUXIndexTrainingDataBegin } from '../../qualities/index/trainingData/indexTrainingDataBegin.quality';
import { logixUXIndexTrainingDataContent } from '../../qualities/index/trainingData/indexTrainingDataContent.quality';
import { logixUXIndexTrainingDataEnd } from '../../qualities/index/trainingData/indexTrainingDataEnd.quality';

export const logixUXIndexPageStrategyTopic = 'index';
export const logixUXIndexPageStrategy: PageStrategyCreators = () => () => {
  // Body
  // const [
  //   stitchDialogEnd,
  //   stitchDialogStrategy
  // ] = logixUXIndexDialogStrategyStitch();
  // const stepDialog = createActionNodeFromStrategy(stitchDialogStrategy);
  const stepStitch = axium_createStitchNode();
  const stepLogixUXIndexHero = createActionNode(logixUXIndexHero(), {
    successNode: stepStitch,
    failureNode: null,
  });
  const logixUXBody: ActionStrategyStitch = () => [
    stepStitch,
    createStrategy({
      topic: 'Create logixUX Body Content',
      initialNode: stepLogixUXIndexHero,
    }),
  ];

  const pageData = userInterface_createPage({
    title: logixUXIndexPageStrategyTopic,
    conceptAndProps: [{ name: 'helloWorld' }],
    cachedSelectors: [],
    compositions: [],
  });

  return userInterfaceCreatePageStrategy(
    logixUXIndexPageStrategyTopic,
    pageData,
    [logixUXBody, logixUXIndexDialogStrategyStitch, logixUXIndexTrainingDataStrategyStitch, logixUXFooterStrategy],
    logixUXHeaderStrategy
  );
};

export const logixUXIndexDialogStrategyStitchTopic = 'logixUX Index Dialog Strategy Stitch';
export const logixUXIndexDialogStrategyStitch: ActionStrategyStitch = () => {
  // Body
  const stepLogixUXIndexDialogEnd = createActionNode(logixUXIndexDialogEnd(), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXIndexDialogContent = createActionNode(logixUXIndexDialogContent(), {
    successNode: stepLogixUXIndexDialogEnd,
    failureNode: null,
  });
  const stepLogixUXIndexDialogBegin = createActionNode(logixUXIndexDialogBegin(), {
    successNode: stepLogixUXIndexDialogContent,
    failureNode: null,
  });
  return [
    stepLogixUXIndexDialogEnd,
    createStrategy({
      topic: logixUXIndexDialogStrategyStitchTopic,
      initialNode: stepLogixUXIndexDialogBegin,
    }),
  ];
};

export const logixUXIndexTrainingDataStrategyStitchTopic = 'logixUX Index Training Data Strategy Stitch';
export const logixUXIndexTrainingDataStrategyStitch: ActionStrategyStitch = () => {
  // Body
  const stepLogixUXIndexTrainingDataEnd = createActionNode(logixUXIndexTrainingDataEnd(), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXIndexTrainingDataContent = createActionNode(logixUXIndexTrainingDataContent(), {
    successNode: stepLogixUXIndexTrainingDataEnd,
    failureNode: null,
  });
  const stepLogixUXIndexTrainingDataBegin = createActionNode(logixUXIndexTrainingDataBegin(), {
    successNode: stepLogixUXIndexTrainingDataContent,
    failureNode: null,
  });
  return [
    stepLogixUXIndexTrainingDataEnd,
    createStrategy({
      topic: logixUXIndexTrainingDataStrategyStitchTopic,
      initialNode: stepLogixUXIndexTrainingDataBegin,
    }),
  ];
};
