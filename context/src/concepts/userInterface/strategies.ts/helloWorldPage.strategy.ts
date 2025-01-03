/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a strategy that will create a hello world page to be loaded onto the client.
$>*/
/*<#*/
import {
  ActionStrategyParameters,
  ActionStrategyStitch,
  muxium_createStitchNode,
  createActionNode,
  createStrategy,
  Deck,
  MuxiumDeck,
} from 'stratimux';
import { htmlHelloWorld } from '../../html/qualities/helloWorld.quality';
import { HelloWorldDeck, helloWorldName } from '../../helloWorld/helloWorld.concept';
import { PageStrategyCreators, userInterface_createPage } from '../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from './createPage.strategy';
import { HtmlDeck } from '../../html/html.concepts';

export const helloWorldPageTopic = 'Hello World Page';
export const helloWorldPageStrategy: PageStrategyCreators = () => (deck: Deck<MuxiumDeck & HtmlDeck>) => {
  const stepStitch = muxium_createStitchNode(deck);
  const stepOne = createActionNode(
    deck.html.e.htmlHelloWorld({
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
  return userInterfaceCreatePageStrategy(helloWorldPageTopic, pageData, [helloWorldBody], deck);
};
/*#>*/
