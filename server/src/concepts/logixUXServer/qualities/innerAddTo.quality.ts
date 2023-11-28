/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that add a number to a sum in the data field.
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
import { logixUX_convertNumberToStringVerbose } from '../verboseNumber.model';

export type LogixUXServerInnerAddToPayload = {
  addTo: number
};
export const logixUXServerInnerAddToType: ActionType = 'add';
export const logixUXServerInnerAddTo =
  prepareActionWithPayloadCreator<LogixUXServerInnerAddToPayload>(logixUXServerInnerAddToType);
export type LogixUXServerInnerAddField = {
  sum: number
}

const logixUXServerInnerAddToMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const {addTo} = selectPayload<LogixUXServerInnerAddToPayload>(action);
    if (action.strategy) {
      const strategy = action.strategy;
      const data = strategyData_select<LogixUXServerInnerAddField>(strategy);
      if (data) {
        const {sum} = data;
        const final = sum + addTo;
        strategy.currentNode.actionType = logixUX_convertNumberToStringVerbose(addTo) + ' ' + action.type + ' to ' + logixUX_convertNumberToStringVerbose(sum) + ', equals ' + final;
        strategy.currentNode.successNotes = {
          preposition: 'Then'
        };
        console.log(addTo, ' add to ', sum, ' is ', final);
        return strategySuccess(strategy, strategyData_unifyData(strategy, {
          sum: final
        }));
      }
    }
    return action;
  });

export const logixUXServerInnerAddToQuality = createQuality(
  logixUXServerInnerAddToType,
  defaultReducer,
  logixUXServerInnerAddToMethodCreator
);
/*#>*/