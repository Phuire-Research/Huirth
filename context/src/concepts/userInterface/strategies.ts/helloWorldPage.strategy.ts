import { ActionStrategyParameters, ActionStrategyStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { htmlHelloWorld } from '../../html/qualities/helloWorld.quality';
import { helloWorldName } from '../../helloWorld/helloWorld.concept';
import { PageStrategyCreators, userInterface_createPage } from '../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from './createPage.strategy';

export const helloWorldPageTopic = 'Hello World Page';
// In Logical Conceptualism. This is called a Logical Stitch.
//  Where despite the order to declare ActionNodes and have a cohesive strategy is reversed sequentially
//    It appears ordered due to another reversal caused by the order of children.
export const helloWorldPageStrategy: PageStrategyCreators = () => () => {
  // const stepFour = createActionNode(userInterfaceAddComposedPageToState(), {
  //   successNode: null,
  //   failureNode: null
  // });
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
