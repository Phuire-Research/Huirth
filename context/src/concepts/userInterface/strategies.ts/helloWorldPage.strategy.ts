/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will create a hello world page to be loaded onto the client.
$>*/
/*<#*/
import { ActionStrategyParameters, ActionStrategyStitch, muxium_createStitchNode, createActionNode, createStrategy } from '@phuire/stratimux';
import { htmlHelloWorld } from '../../html/qualities/helloWorld.quality';
import { helloWorldName } from '../../helloWorld/helloWorld.concept';
import { PageStrategyCreators, userInterface_createPage } from '../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from './createPage.strategy';

export const helloWorldPageTopic = 'Hello World Page';
export const helloWorldPageStrategy: PageStrategyCreators = () => () => {
  const stepStitch = muxium_createStitchNode();
  const stepOne = createActionNode(
    htmlHelloWorld({
      pageTitle: helloWorldPageTopic,
    }),
    {
      successNode: stepStitch,
      failureNode: null,
    }
  );

  const params: ActionStrategyParameters = {
    topic: helloWorldPageTopic,
    initialNode: stepOne,
  };

  const pageData = userInterface_createPage({
    title: 'helloWorld',
    compositions: [],
    cachedSelectors: [],
    cachedComponentSelectors: [],
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
