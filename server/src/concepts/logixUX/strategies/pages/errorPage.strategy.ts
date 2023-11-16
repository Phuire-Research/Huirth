import { axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import {
  ActionComponentPayload,
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface_createPage
} from '../../../../model/userInterface';
import { logixUXError } from '../../qualities/components/error/error.quality';
import { logixUXFooterStrategy } from '../components/footer.strategy';
import { logixUXHeaderStrategy } from '../components/header.strategy';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';

export const logixUXErrorPageStrategyTopic = 'error';
export const logixUXErrorPageStrategy: PageStrategyCreators = () => () => {
  const page: ActionComponentPayload = {
    pageTitle: logixUXErrorPageStrategyTopic
  };
  // Body
  const stepStitch = axium_createStitchNode();
  const stepLogixUXError = createActionNode(logixUXError(page), {
    successNode: stepStitch,
    failureNode: null
  });
  const logixUXBody: ActionStrategyComponentStitch = () => [stepStitch, createStrategy({
    topic: 'Create logixUX Error Body Content',
    initialNode: stepLogixUXError,
  })];

  const pageData = userInterface_createPage({
    title: logixUXErrorPageStrategyTopic,
    conceptAndProps: [{ name: 'helloWorld'}],
    cachedSelectors: [],
    compositions: []
  });

  return userInterfaceCreatePageStrategy(
    logixUXErrorPageStrategyTopic,
    pageData,
    [
      logixUXBody,
      logixUXFooterStrategy
    ],
    logixUXHeaderStrategy
  );
};
