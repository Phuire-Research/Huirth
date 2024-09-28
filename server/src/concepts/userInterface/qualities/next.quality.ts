/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will backtrack to the previous node and call the next successive action.
$>*/
/*<#*/
import { createMethod, createQualityCard, nullReducer, strategy } from '@phuire/stratimux';

export const userInterfaceNext = createQualityCard({
  type: 'User Interface Next Strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod(({action}) => {
      const st = action.strategy;
      if (st) {
        const prev = strategy.backTrack(st);
        if (prev.strategy) {
          return strategy.success(prev.strategy);
        } else {
          return prev;
        }
      } else {
        return action;
      }
    }),
});
/*#>*/
