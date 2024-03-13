/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a Page Strategy Creator that will unify Sidebar, Error, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import {
  ActionComponentPayload,
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface,
  userInterface_createPage,
} from '../../../../model/userInterface';
import { logixUXError } from '../../qualities/components/error/error.quality';
import { logixUXFooterStitch } from '../components/footer.strategy';
import { logixUXHeaderStitch } from '../components/header.strategy';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { logixUXSidebarComponentStitch } from '../components/sidebar.strategy';

export const logixUXErrorPageStrategyTopic = 'error';
export const logixUXErrorPageStrategy: PageStrategyCreators = () => () => {
  const page: ActionComponentPayload = {
    pageTitle: logixUXErrorPageStrategyTopic,
  };
  // Body
  const stepStitch = axium_createStitchNode();
  const stepLogixUXError = userInterface.createComponent(logixUXError(page), stepStitch);
  const logixUXErrorStitch: ActionStrategyComponentStitch = () => [
    stepStitch,
    createStrategy({
      topic: 'Create logixUX Error Body Content',
      initialNode: stepLogixUXError,
    }),
  ];

  const pageData = userInterface_createPage({
    title: logixUXErrorPageStrategyTopic,
    conceptAndProps: [],
    cachedSelectors: [],
    compositions: [],
    cachedComponentSelectors: [],
  });

  return userInterfaceCreatePageStrategy(
    logixUXErrorPageStrategyTopic,
    pageData,
    [logixUXSidebarComponentStitch, logixUXErrorStitch, logixUXFooterStitch],
    logixUXHeaderStitch
  );
};
