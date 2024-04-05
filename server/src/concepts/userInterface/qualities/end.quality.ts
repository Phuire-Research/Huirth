/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a pure quality that will end a strategy without effecting the Axium's dialog system, simply by not including a method and using the default reducer.
$>*/
/*<#*/
import {
  ActionType,
  createQuality,
  nullReducer,
  prepareActionCreator,
} from 'stratimux';

export const userInterfaceEndType: ActionType =
  'User Interface End Strategy';
export const userInterfaceEnd = prepareActionCreator(userInterfaceEndType);

export const userInterfaceEndQuality = createQuality(
  userInterfaceEndType,
  nullReducer
);
/*#>*/