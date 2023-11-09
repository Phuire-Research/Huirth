import { ActionStrategyStitch, createActionNode, createActionNodeFromStrategy, createStrategy } from 'stratimux';
import { PageStrategyCreators, userInterface_createPage } from '../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../userInterface/strategies.ts/createPage.strategy';
import { logixUXFooterStrategy } from './footer.strategy';
import { logixUXHeaderStrategy } from './header.strategy';
import { logixUXIndexHero } from '../qualities/index/indexHero.quality';
import { logixUXIndexDialogBegin } from '../qualities/index/dialog/indexDialogBegin.quality';
import { logixUXIndexDialogContent } from '../qualities/index/dialog/indexDialogContent.quality';
import { logixUXIndexDialogEnd } from '../qualities/index/dialog/indexDialogEnd.quality';

export const logixUXIndexPageStrategyTopic = 'logixUX Index Page Strategy Stitch';
export const logixUXIndexPageStrategy: PageStrategyCreators = () => () => {
  // Body
  const [
    stitchEnd,
    stitchStrategy
  ] = logixUXIndexDialogStrategyStitch();
  const stepDialog = createActionNodeFromStrategy(stitchStrategy);
  const stepLogixUXIndexHero = createActionNode(logixUXIndexHero(), {
    successNode: stepDialog,
    failureNode: null
  });
  const logixUXBody: ActionStrategyStitch = () => [stitchEnd, createStrategy({
    topic: 'Create logixUX Body Content',
    initialNode: stepLogixUXIndexHero,
  })];

  const pageData = userInterface_createPage({
    title: 'index',
    conceptAndProps: [
      { name: 'helloWorld'},
    ],
    cachedSelectors: [],
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

export const logixUXIndexDialogStrategyStitchTopic = 'logixUX Index Dialog Strategy Stitch';
export const logixUXIndexDialogStrategyStitch: ActionStrategyStitch = () => {
  // Body
  const stepLogixUXIndexDialogEnd = createActionNode(logixUXIndexDialogEnd(), {
    successNode: null,
    failureNode: null
  });
  const stepLogixUXIndexDialogContent = createActionNode(logixUXIndexDialogContent(), {
    successNode: stepLogixUXIndexDialogEnd,
    failureNode: null
  });
  const stepLogixUXIndexDialogBegin = createActionNode(logixUXIndexDialogBegin(), {
    successNode: stepLogixUXIndexDialogContent,
    failureNode: null
  });
  return [
    stepLogixUXIndexDialogEnd,
    createStrategy({
      topic: 'Create logixUX Body Content',
      initialNode: stepLogixUXIndexDialogBegin,
    })
  ];
};