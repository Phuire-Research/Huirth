/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will backtrack to the previous node and call the next successive action.
$>*/
/*<#*/
import { ActionType, createMethod, createQuality, nullReducer, prepareActionCreator, strategy } from 'stratimux';

export const userInterfaceNextType: ActionType = 'User Interface Next Strategy';
export const userInterfaceNext = prepareActionCreator(userInterfaceNextType);
const userInterfaceNextMethodCreator = () =>
  createMethod((action) => {
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
  });

export const userInterfaceNextQuality = createQuality(userInterfaceNextType, nullReducer, userInterfaceNextMethodCreator);
/*#>*/
