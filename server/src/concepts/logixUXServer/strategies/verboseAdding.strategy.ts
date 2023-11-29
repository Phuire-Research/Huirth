/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a strategy that in isolation will transform a count within itself and count out the changes to the number in its action list.
$>*/
/*<#*/
import { Action, ActionStrategy, axium_createGatherNode, createActionNodeFromStrategy, createStrategy } from 'stratimux';
import { logixUX_convertNumberToStringVerbose } from '../verboseNumber.model';
import { logixUXServerInnerAddTo } from '../qualities/innerAddTo.quality';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const logixUXServerVerboseAddingStrategyTopic = (length: number): string => 'Sum ' + logixUX_convertNumberToStringVerbose(length) + ' random numbers together and then output the final sum';
export const logixUXServerVerboseAddingStrategy = (length: number): ActionStrategy => {
  const actions: Action[] = [];
  for (let i = 0; i < length; i++) {
    const addTo = Math.round(getRandomRange(1, 100));
    actions.push(logixUXServerInnerAddTo({addTo}));
  }
  return createStrategy({
    topic: logixUXServerVerboseAddingStrategyTopic(length),
    initialNode: axium_createGatherNode({actions}),
    data: {
      sum: 0
    }
  });
};
/*#>*/