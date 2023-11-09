import { ActionStrategyStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { PageStrategyCreators, userInterface_createPage } from '../../../model/userInterface';
import { logixUXError } from '../qualities/error.quality';
import { logixUXFooterStrategy } from './footer.strategy';
import { logixUXHeaderStrategy } from './header.strategy';
import { userInterfaceCreatePageStrategy } from '../../userInterface/strategies.ts/createPage.strategy';

export const logixUXErrorPageStrategyTopic = 'logixUX Error Page Strategy Stitch';
export const logixUXErrorPageStrategy: PageStrategyCreators = () => () => {
  // Body
  const stepStitch = axium_createStitchNode();
  const stepLogixUXError = createActionNode(logixUXError(), {
    successNode: stepStitch,
    failureNode: null
  });
  const logixUXBody: ActionStrategyStitch = () => [stepStitch, createStrategy({
    topic: 'Create logixUX Error Body Content',
    initialNode: stepLogixUXError,
  })];

  const pageData = userInterface_createPage({
    title: 'error',
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
