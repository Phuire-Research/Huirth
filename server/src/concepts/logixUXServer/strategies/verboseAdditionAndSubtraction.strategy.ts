/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a strategy that in isolation will start with a sum of zero then subtract a series of random numbers from that sum.
$>*/
/*<#*/
import { Action, ActionStrategy, axium_createGatherNode, createStrategy } from 'stratimux';
import { logixUX_convertNumberToStringVerbose } from '../verboseNumber.model';
import { logixUXServerInnerSubtractFrom } from '../qualities/innerSubtractFrom.quality';
import { logixUXServerInnerAddTo } from '../qualities/innerAddTo.quality';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const logixUXServerVerboseAdditionAndSubtractionStrategyTopic =
  (length: number): string => 'Starting from zero add or subtract' + logixUX_convertNumberToStringVerbose(length) + ' random numbers from a total sum, and then output the final sum';
export const logixUXServerVerboseAdditionAndSubtractionStrategy = (length: number): ActionStrategy => {
  const actions: Action[] = [];
  for (let i = 0; i < length; i++) {
    const number = Math.round(getRandomRange(1, 100));
    const even = Math.round(getRandomRange(1, 5)) % 2;
    actions.push( even ? logixUXServerInnerAddTo({
      addTo: number
    }) : logixUXServerInnerSubtractFrom({
      subtractFrom: number
    }));
  }

  return createStrategy({
    topic: logixUXServerVerboseAdditionAndSubtractionStrategyTopic(length),
    initialNode: axium_createGatherNode({actions}),
    data: {
      sum: 0
    }
  });
};
/*#>*/