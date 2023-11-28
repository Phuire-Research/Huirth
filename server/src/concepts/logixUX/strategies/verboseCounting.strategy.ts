/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a strategy that in isolation will transform a count within itself and count out the changes to the number in its action list.
$>*/
/*<#*/
import { Action, ActionStrategy, axium_createGatherNode, createStrategy } from 'stratimux';
import { logixUX_convertNumberToStringVerbose } from '../verboseCounting.model';
import { logixUXInnerCountBy } from '../qualities/innerCountBy.quality';

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const logixUXVerboseCountingStrategySelect = 'Verbose Counting Transformation Strategy';
export const logixUXVerboseCountingStrategyTopic = (length: number): string => `logixUX will randomly count and iterate upon a number starting from zero, ${logixUX_convertNumberToStringVerbose(length)} times`;
export const logixUXVerboseCountingStrategy = (length: number): ActionStrategy => {
  const actions: Action[] = [];
  for (let i = 0; i < length; i++) {
    const countBy = Math.round(getRandomRange(1, 100));
    actions.push(logixUXInnerCountBy({countBy}));
  }
  return createStrategy({
    topic: logixUXVerboseCountingStrategyTopic(length),
    initialNode: axium_createGatherNode({actions}),
    data: {
      count: 0
    }
  });
};
/*#>*/