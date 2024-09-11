/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that set each entry of the data set selection to false.
$>*/
/*<#*/
import { Action, createQualityCard, defaultMethodCreator } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';

export const [huirthClearDataSetSelection, huirthClearDataSetSelectionType, huirthClearDataSetSelectionQuality] = createQualityCard({
  type: 'huirth clear the current data set selection',
  reducer: (state: huirthState, _: Action): huirthState => {
    const dataSetSelection = state.dataSetSelection.map(() => false);
    return {
      ...state,
      dataSetSelection,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
