import { ActionStrategyStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { logixUXIndex } from '../qualities/index.quality';
import { PageStrategyCreators, userInterface_createPage } from '../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStrategy } from './footer.strategy';
import { logixUXHeaderStrategy } from './header.strategy';

export const logixUXIndexPageStrategyTopic = 'logixUX Index Page Strategy Stitch';
export const logixUXIndexPageStrategy: PageStrategyCreators = () => () => {
  // Body
  const stepStitch = axium_createStitchNode();
  const stepLogixUXIndex = createActionNode(logixUXIndex(), {
    successNode: stepStitch,
    failureNode: null
  });
  const logixUXBody: ActionStrategyStitch = () => [stepStitch, createStrategy({
    topic: 'Create logixUX Body Content',
    initialNode: stepLogixUXIndex,
  })];

  const pageData = userInterface_createPage({
    title: 'index',
    conceptAndProps: [
      { name: 'helloWorld'},
    ],
    compositions: []
  });

  return userInterfaceCreatePageStrategy(
    logixUXIndexPageStrategyTopic,
    pageData,
    [
      logixUXBody,
      logixUXFooterStrategy
    ],
    logixUXHeaderStrategy
  );
};
