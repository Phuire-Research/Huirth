import { ActionStrategyStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { PageStrategyCreators, userInterface_createPage } from '../../../../model/userInterface';
import { logixUXError } from '../../qualities/error/error.quality';
import { logixUXFooterStrategy } from '../components/footer.strategy';
import { logixUXHeaderStrategy } from '../components/header.strategy';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';

export const logixUXErrorPageStrategyTopic = 'error';
export const logixUXErrorPageStrategy: PageStrategyCreators = () => () => {
  // Body
  const stepStitch = axium_createStitchNode();
  const stepLogixUXError = createActionNode(logixUXError(), {
    successNode: stepStitch,
    failureNode: null,
  });
  const logixUXBody: ActionStrategyStitch = () => [
    stepStitch,
    createStrategy({
      topic: 'Create logixUX Error Body Content',
      initialNode: stepLogixUXError,
    }),
  ];

  const pageData = userInterface_createPage({
    title: logixUXErrorPageStrategyTopic,
    conceptAndProps: [{ name: 'helloWorld' }],
    cachedSelectors: [],
    compositions: [],
  });

  return userInterfaceCreatePageStrategy(
    logixUXErrorPageStrategyTopic,
    pageData,
    [logixUXBody, logixUXFooterStrategy],
    logixUXHeaderStrategy
  );
};
