/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that set each entry of the data set selection to false.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { huirthState } from '../huirth.concept';

export const [
  huirthClearDataSetSelection,
  huirthClearDataSetSelectionType,
  huirthClearDataSetSelectionQuality
] = createQualitySet({
  type: 'huirth clear the current data set selection',
  reducer: (state: huirthState, _: Action): huirthState => {
    const dataSetSelection = state.dataSetSelection.map(() => false);
    return {
      ...state,
      dataSetSelection
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/