/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that remove a dataset and if it is a project, update the status to installed.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_select,
  strategyData_unifyData,
  strategySuccess,
} from 'stratimux';
import { logixUX_convertNumberToStringVerbose } from '../verboseCounting.model';

export type LogixUXInnerCountByPayload = {
  countBy: number
};
export const logixUXInnerCountByType: ActionType = 'count';
export const logixUXInnerCountBy =
  prepareActionWithPayloadCreator<LogixUXInnerCountByPayload>(logixUXInnerCountByType);
export type LogixUXInnerCountField = {
  count: number
}

const logixUXInnerCountByMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const {countBy} = selectPayload<LogixUXInnerCountByPayload>(action);
    if (action.strategy) {
      const strategy = action.strategy;
      const data = strategyData_select<LogixUXInnerCountField>(strategy);
      if (data) {
        const {count} = data;
        strategy.currentNode.actionType = logixUX_convertNumberToStringVerbose(count) + ' ' + action.type + ' by ' + logixUX_convertNumberToStringVerbose(countBy);
        strategy.currentNode.successNotes = {
          preposition: 'Then'
        };
        const final = count + countBy;
        console.log(count, ' count by ', countBy, ' is ', final);
        return strategySuccess(strategy, strategyData_unifyData(strategy, {
          count: final
        }));
      }
    }
    return action;
  });

export const logixUXInnerCountByQuality = createQuality(
  logixUXInnerCountByType,
  defaultReducer,
  logixUXInnerCountByMethodCreator
);
/*#>*/