/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that add a number to a sum in the data field.
$>*/
/*<#*/
import {
  createMethod,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategyData_select,
  strategyData_unifyData,
  strategySuccess,
} from 'stratimux';
import { logixUX_convertNumberToStringVerbose } from '../verboseNumber.model';

export type LogixUXServerInnerAddToPayload = {
  addTo: number
};
export type LogixUXServerInnerAddField = {
  sum: number
}

export const [
  logixUXServerInnerAddTo,
  logixUXServerInnerAddToType,
  logixUXServerInnerAddToQuality
] = createQualitySetWithPayload<LogixUXServerInnerAddToPayload>({
  type: 'plus',
  reducer: nullReducer,
  methodCreator: () =>
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
    })
});
/*#>*/