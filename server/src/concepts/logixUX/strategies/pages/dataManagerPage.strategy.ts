import { createActionNode, createStrategy } from 'stratimux';
import {
  ActionComponentPayload,
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface_createPage
} from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStrategy } from '../components/footer.strategy';
import { logixUXHeaderStrategy } from '../components/header.strategy';
import { logixUXDataManagerBegin } from '../../qualities/components/dataManager/dataManagerBegin.quality';
import { logixUXDataManagerContent } from '../../qualities/components/dataManager/dataManagerContent.quality';
import { logixUXDataManagerEnd } from '../../qualities/components/dataManager/dataManagerEnd.quality';
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';

export const logixUXDataManagerPageStrategyTopic = 'dataManager';
export const logixUXDataManagerPageStrategy: PageStrategyCreators = () => () => {
  const page: ActionComponentPayload = {
    pageTitle: logixUXDataManagerPageStrategyTopic
  };
  // Body
  // const [
  //   stitchDialogEnd,
  //   stitchDialogStrategy
  // ] = logixUXIndexDialogStrategyStitch();
  // const stepDialog = createActionNodeFromStrategy(stitchDialogStrategy);

  const pageData = userInterface_createPage({
    title: logixUXDataManagerPageStrategyTopic,
    conceptAndProps: [
      { name: 'helloWorld'},
    ],
    cachedSelectors: [],
    compositions: []
  });

  return userInterfaceCreatePageStrategy(
    logixUXDataManagerPageStrategyTopic,
    pageData,
    [
      logixUXSidebarComponentStitch,
      logixUXDataManagerStrategyStitch,
      logixUXFooterStrategy
    ],
    logixUXHeaderStrategy
  );
};

export const logixUXDataManagerStrategyStitchTopic = 'logixUX Index Training Data Strategy Stitch';
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