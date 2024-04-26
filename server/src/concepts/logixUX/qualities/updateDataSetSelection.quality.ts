/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that updates a DataSet's selection within state by index by toggling the boolean value.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export type LogixUXUpdateDataSetSelectionPayload = {
  index: number,
}

export const [
  logixUXUpdateDataSetSelection,
  logixUXUpdateDataSetSelectionType,
  logixUXUpdateDataSetSelectionQuality
] = createQualitySetWithPayload<LogixUXUpdateDataSetSelectionPayload>({
  type: 'Create logixUX update data set selection',
  reducer: (state: LogixUXState, action: Action): LogixUXState => {
    const {index} = selectPayload<LogixUXUpdateDataSetSelectionPayload>(action);
    const dataSetSelection = [...state.dataSetSelection];
    console.log('CHECK DATA SET SELECTION BEFORE', dataSetSelection);
    if (dataSetSelection[index] !== undefined) {
      dataSetSelection[index] = !dataSetSelection[index];
    }
    console.log('CHECK DATA SET SELECTION AFTER', dataSetSelection);
    return {
      ...state,
      dataSetSelection,
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/