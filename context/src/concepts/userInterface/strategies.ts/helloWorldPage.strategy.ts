/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will create a hello world page to be loaded onto the client.
$>*/
/*<#*/
import { ActionStrategyParameters, ActionStrategyStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { htmlHelloWorld } from '../../html/qualities/helloWorld.quality';
import { helloWorldName } from '../../helloWorld/helloWorld.concept';
import { PageStrategyCreators, userInterface_createPage } from '../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from './createPage.strategy';

export const helloWorldPageTopic = 'Hello World Page';
export const helloWorldPageStrategy: PageStrategyCreators = () => () => {
  const stepStitch = axium_createStitchNode();
  const stepOne = createActionNode(htmlHelloWorld(), {
    successNode: stepStitch,
    failureNode: null,
  });

  const params: ActionStrategyParameters = {
    topic: helloWorldPageTopic,
    initialNode: stepOne,
  };

  const pageData = userInterface_createPage({
    title: 'helloWorld',
    compositions: [],
    cachedSelectors: [],
    conceptAndProps: [
      {
        name: helloWorldName,
      },
    ],
  });

  const helloWorldBody: ActionStrategyStitch = () => [stepStitch, createStrategy(params)];
  return userInterfaceCreatePageStrategy(helloWorldPageTopic, pageData, [helloWorldBody]);
};
/*#>*/
