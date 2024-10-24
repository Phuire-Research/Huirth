/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a strategy that in isolation will transform a count within itself and count out the changes to the number in its action list.
$>*/
/*<#*/
import { Action, ActionStrategy, AnyAction, muxium_createGatherNode, createStrategy, Deck } from 'stratimux';
import { huirth_convertNumberToStringVerbose } from '../verboseNumber.model';
import { huirthServerInnerAddTo } from '../qualities/innerAddTo.quality';
import { HuirthServerDeck } from '../huirthServer.concept';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const huirthServerVerboseAddingStrategyTopic = (length: number): string =>
  'Sum ' + huirth_convertNumberToStringVerbose(length) + ' random numbers together and then output the final sum';
export const huirthServerVerboseAddingStrategy = (length: number, deck: Deck<HuirthServerDeck>): ActionStrategy => {
  const actions: AnyAction[] = [];
  for (let i = 0; i < length; i++) {
    const addTo = Math.round(getRandomRange(1, 100));
    actions.push(deck.huirthServer.e.huirthServerInnerAddTo({ addTo }));
  }
  return createStrategy({
    topic: huirthServerVerboseAddingStrategyTopic(length),
    initialNode: muxium_createGatherNode(deck, { actions }),
    data: {
      sum: 0,
    },
  });
};
/*#>*/
