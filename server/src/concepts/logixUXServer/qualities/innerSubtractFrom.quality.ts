/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that subtract a number from a total sum in the data field.
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

export type LogixUXServerInnerSubtractFromPayload = {
  subtractFrom: number
};
export type LogixUXServerInnerAddField = {
  sum: number
}

export const [
  logixUXServerInnerSubtractFrom,
  logixUXServerInnerSubtractFromType,
  logixUXServerInnerSubtractFromQuality
] = createQualitySetWithPayload<LogixUXServerInnerSubtractFromPayload>({
  type: 'subtract',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod((action) => {
      const {subtractFrom} = selectPayload<LogixUXServerInnerSubtractFromPayload>(action);
      if (action.strategy) {
        const strategy = action.strategy;
        const data = strategyData_select<LogixUXServerInnerAddField>(strategy);
        if (data) {
          const {sum} = data;
          const final = sum - subtractFrom;
          let verboseSum = logixUX_convertNumberToStringVerbose(sum);
          verboseSum = verboseSum[0].toUpperCase() + verboseSum.substring(1);
          strategy.currentNode.actionType = verboseSum.trim()  + ' ' + action.type + ' ' + logixUX_convertNumberToStringVerbose(subtractFrom).trim() + ', equals ' + logixUX_convertNumberToStringVerbose(final).trim();
          strategy.currentNode.successNotes = {
            preposition: ''
          };
          console.log(verboseSum, ' subtract ', subtractFrom, ' equals ', final);
          return strategySuccess(strategy, strategyData_unifyData(strategy, {
            sum: final
          }));
        }
      }
      return action;
    })
});
/*#>*/