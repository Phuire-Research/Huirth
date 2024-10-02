/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's selection within state by index by toggling the boolean value.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';

export type huirthUpdateDataSetSelectionPayload = {
  index: number;
};

export const huirthUpdateDataSetSelection = createQualityCardWithPayload<huirthState, huirthUpdateDataSetSelectionPayload>({
  type: 'Create huirth update data set selection',
  reducer: (state, action) => {
    const { index } = action.payload;
    const dataSetSelection = [...state.dataSetSelection];
    console.log('CHECK DATA SET SELECTION BEFORE', dataSetSelection, index);
    if (dataSetSelection[index] !== undefined) {
      dataSetSelection[index] = !dataSetSelection[index];
    }
    console.log('CHECK DATA SET SELECTION AFTER', dataSetSelection);
    return {
      dataSetSelection,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
