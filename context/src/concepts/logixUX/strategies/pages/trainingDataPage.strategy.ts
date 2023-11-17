import { ActionStrategyStitch, axium_createStitchNode, createActionNode, createActionNodeFromStrategy, createStrategy } from 'stratimux';
import {
  ActionComponentPayload,
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface_createPage,
} from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStrategy } from '../components/footer.strategy';
import { logixUXHeaderStrategy } from '../components/header.strategy';
import { logixUXIndexHero } from '../../qualities/components/hero/indexHero.quality';
import { logixUXIndexDialogBegin } from '../../qualities/components/dialog/indexDialogBegin.quality';
import { logixUXIndexDialogContent } from '../../qualities/components/dialog/indexDialogContent.quality';
import { logixUXIndexDialogEnd } from '../../qualities/components/dialog/indexDialogEnd.quality';
import { logixUXIndexDPOBegin } from '../../qualities/components/DPO/DPOBegin.quality';
import { logixUXIndexDPOContent } from '../../qualities/components/DPO/DPOContent.quality';
import { logixUXIndexDPOEnd } from '../../qualities/components/DPO/DPOEnd.quality';

export const logixUXDataManagerPageStrategyTopic = 'dataManager';
export const logixUXIndexPageStrategy: PageStrategyCreators = () => () => {
  const page: ActionComponentPayload = {
    pageTitle: logixUXDataManagerPageStrategyTopic,
  };
  // Body
  // const [
  //   stitchDialogEnd,
  //   stitchDialogStrategy
  // ] = logixUXIndexDialogStrategyStitch();
  // const stepDialog = createActionNodeFromStrategy(stitchDialogStrategy);
  const stepStitch = axium_createStitchNode();
  const stepLogixUXIndexHero = createActionNode(logixUXIndexHero(page), {
    successNode: stepStitch,
    failureNode: null,
  });
  const logixUXBody: ActionStrategyComponentStitch = (payload) => [
    stepStitch,
    createStrategy({
      topic: 'Create logixUX Body Content',
      initialNode: stepLogixUXIndexHero,
    }),
  ];

  const pageData = userInterface_createPage({
    title: logixUXDataManagerPageStrategyTopic,
    conceptAndProps: [{ name: 'helloWorld' }],
    cachedSelectors: [],
    compositions: [],
  });

  return userInterfaceCreatePageStrategy(
    logixUXDataManagerPageStrategyTopic,
    pageData,
    [logixUXBody, logixUXIndexDialogStrategyStitch, logixUXIndexDPOStrategyStitch, logixUXFooterStrategy],
    logixUXHeaderStrategy
  );
};

export const logixUXIndexDialogStrategyStitchTopic = 'logixUX Index Dialog Strategy Stitch';
export const logixUXIndexDialogStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  const stepLogixUXIndexDialogEnd = createActionNode(logixUXIndexDialogEnd(payload), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXIndexDialogContent = createActionNode(logixUXIndexDialogContent(payload), {
    successNode: stepLogixUXIndexDialogEnd,
    failureNode: null,
  });
  const stepLogixUXIndexDialogBegin = createActionNode(logixUXIndexDialogBegin(payload), {
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

export const logixUXIndexDPOStrategyStitchTopic = 'logixUX Index Training Data Strategy Stitch';
export const logixUXIndexDPOStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  // Body
  const stepLogixUXIndexDPOEnd = createActionNode(logixUXIndexDPOEnd(payload), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXIndexDPOContent = createActionNode(logixUXIndexDPOContent(payload), {
    successNode: stepLogixUXIndexDPOEnd,
    failureNode: null,
  });
  const stepLogixUXIndexDPOBegin = createActionNode(logixUXIndexDPOBegin(payload), {
    successNode: stepLogixUXIndexDPOContent,
    failureNode: null,
  });
  return [
    stepLogixUXIndexDPOEnd,
    createStrategy({
      topic: logixUXIndexDPOStrategyStitchTopic,
      initialNode: stepLogixUXIndexDPOBegin,
    }),
  ];
};
