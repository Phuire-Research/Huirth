/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that add a number to a sum in the data field.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  nullReducer,
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
export const logixUXServerInnerAddToType: ActionType = 'plus';
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
        let verboseSum = logixUX_convertNumberToStringVerbose(sum);
        verboseSum = verboseSum[0].toUpperCase() + verboseSum.substring(1);
        strategy.currentNode.actionType = verboseSum.trim() + ' ' + action.type + ' ' + logixUX_convertNumberToStringVerbose(addTo).trim() + ', equals ' + logixUX_convertNumberToStringVerbose(final).trim();
        strategy.currentNode.successNotes = {
          preposition: ''
        };
        console.log(verboseSum, ' add to ', addTo, ' is ', final);
        return strategySuccess(strategy, strategyData_unifyData(strategy, {
          sum: final
        }));
      }
    }
    return action;
  });

export const logixUXServerInnerAddToQuality = createQuality(
  logixUXServerInnerAddToType,
  nullReducer,
  logixUXServerInnerAddToMethodCreator
);
/*#>*/