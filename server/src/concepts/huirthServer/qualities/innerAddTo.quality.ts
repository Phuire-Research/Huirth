/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that add a number to a sum in the data field.
$>*/
/*<#*/
import {
  createMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyData_select,
  strategyData_muxifyData,
  strategySuccess,
} from '@phuire/stratimux';
import { huirth_convertNumberToStringVerbose } from '../verboseNumber.model';
import { huirthServerState } from '../huirthServer.concept';

export type huirthServerInnerAddToPayload = {
  addTo: number;
};
export type huirthServerInnerAddField = {
  sum: number;
};

export const huirthServerInnerAddTo = createQualityCardWithPayload<huirthServerState, huirthServerInnerAddToPayload>({
  type: 'plus',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod(({ action }) => {
      const { addTo } = action.payload;
      if (action.strategy) {
        const strategy = action.strategy;
        const data = strategyData_select<huirthServerInnerAddField>(strategy);
        if (data) {
          const { sum } = data;
          const final = sum + addTo;
          let verboseSum = huirth_convertNumberToStringVerbose(sum);
          verboseSum = verboseSum[0].toUpperCase() + verboseSum.substring(1);
          strategy.currentNode.actionType =
            verboseSum.trim() +
            ' ' +
            action.type +
            ' ' +
            huirth_convertNumberToStringVerbose(addTo).trim() +
            ', equals ' +
            huirth_convertNumberToStringVerbose(final).trim();
          strategy.currentNode.successNotes = {
            preposition: '',
          };
          console.log(verboseSum, ' add to ', addTo, ' is ', final);
          return strategySuccess(
            strategy,
            strategyData_muxifyData(strategy, {
              sum: final,
            })
          );
        }
      }
      return action;
    }),
});
/*#>*/
