/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a strategy that in isolation will transform a count within itself and count out the changes to the number in its action list.
$>*/
/*<#*/
import { Action, ActionStrategy, axium_createGatherNode, createStrategy } from 'stratimux';
import { huirth_convertNumberToStringVerbose } from '../verboseNumber.model';
import { huirthServerInnerAddTo } from '../qualities/innerAddTo.quality';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const huirthServerVerboseAddingStrategyTopic = (length: number): string => 'Sum ' + huirth_convertNumberToStringVerbose(length) + ' random numbers together and then output the final sum';
export const huirthServerVerboseAddingStrategy = (length: number): ActionStrategy => {
  const actions: Action[] = [];
  for (let i = 0; i < length; i++) {
    const addTo = Math.round(getRandomRange(1, 100));
    actions.push(huirthServerInnerAddTo({addTo}));
  }
  return createStrategy({
    topic: huirthServerVerboseAddingStrategyTopic(length),
    initialNode: axium_createGatherNode({actions}),
    data: {
      sum: 0
    }
  });
};
/*#>*/