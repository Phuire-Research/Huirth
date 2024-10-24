/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a strategy that in isolation will start with a sum of zero then subtract a series of random numbers from that sum.
$>*/
/*<#*/
import { Action, ActionStrategy, AnyAction, muxium_createGatherNode, createStrategy, Deck } from 'stratimux';
import { huirth_convertNumberToStringVerbose } from '../verboseNumber.model';
import { huirthServerInnerSubtractFrom } from '../qualities/innerSubtractFrom.quality';
import { HuirthServerDeck } from '../huirthServer.concept';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const huirthServerVerboseSubtractionStrategyTopic = (length: number): string =>
  'Starting from zero subtract ' +
  huirth_convertNumberToStringVerbose(length) +
  ' random numbers from a total sum, and then output the final sum';
export const huirthServerVerboseSubtractionStrategy = (length: number, deck: Deck<HuirthServerDeck>): ActionStrategy => {
  const actions: AnyAction[] = [];
  for (let i = 0; i < length; i++) {
    const subtractFrom = Math.round(getRandomRange(1, 100));
    actions.push(deck.huirthServer.e.huirthServerInnerSubtractFrom({ subtractFrom }));
  }
  return createStrategy({
    topic: huirthServerVerboseSubtractionStrategyTopic(length),
    initialNode: muxium_createGatherNode(deck, { actions }),
    data: {
      sum: 0,
    },
  });
};
/*#>*/
