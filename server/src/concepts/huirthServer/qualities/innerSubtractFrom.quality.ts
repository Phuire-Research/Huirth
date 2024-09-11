/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that subtract a number from a total sum in the data field.
$>*/
/*<#*/
import {
  createMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyData_select,
  strategyData_unifyData,
  strategySuccess,
} from '@phuire/stratimux';
import { huirth_convertNumberToStringVerbose } from '../verboseNumber.model';

export type huirthServerInnerSubtractFromPayload = {
  subtractFrom: number;
};
export type huirthServerInnerAddField = {
  sum: number;
};

export const [huirthServerInnerSubtractFrom, huirthServerInnerSubtractFromType, huirthServerInnerSubtractFromQuality] =
  createQualityCardWithPayload<huirthServerInnerSubtractFromPayload>({
    type: 'subtract',
    reducer: nullReducer,
    methodCreator: () =>
      createMethod((action) => {
        const { subtractFrom } = selectPayload<huirthServerInnerSubtractFromPayload>(action);
        if (action.strategy) {
          const strategy = action.strategy;
          const data = strategyData_select<huirthServerInnerAddField>(strategy);
          if (data) {
            const { sum } = data;
            const final = sum - subtractFrom;
            let verboseSum = huirth_convertNumberToStringVerbose(sum);
            verboseSum = verboseSum[0].toUpperCase() + verboseSum.substring(1);
            strategy.currentNode.actionType =
              verboseSum.trim() +
              ' ' +
              action.type +
              ' ' +
              huirth_convertNumberToStringVerbose(subtractFrom).trim() +
              ', equals ' +
              huirth_convertNumberToStringVerbose(final).trim();
            strategy.currentNode.successNotes = {
              preposition: '',
            };
            console.log(verboseSum, ' subtract ', subtractFrom, ' equals ', final);
            return strategySuccess(
              strategy,
              strategyData_unifyData(strategy, {
                sum: final,
              })
            );
          }
        }
        return action;
      }),
  });
/*#>*/
