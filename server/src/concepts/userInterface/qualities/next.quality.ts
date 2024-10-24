/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will backtrack to the previous node and call the next successive action.
$>*/
/*<#*/
import { createMethod, createQualityCard, nullReducer, strata } from 'stratimux';

export const userInterfaceNext = createQualityCard({
  type: 'User Interface Next Strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod(({ action }) => {
      const st = action.strategy;
      if (st) {
        const prev = strata.backTrack(st);
        if (prev.strategy) {
          return strata.success(prev.strategy);
        } else {
          return prev;
        }
      } else {
        return action;
      }
    }),
});
/*#>*/
