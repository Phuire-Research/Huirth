/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that set each entry of the data set selection to false.
$>*/
/*<#*/
import { Action, createQualityCard, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';

export const huirthClearDataSetSelection = createQualityCard<huirthState>({
  type: 'huirth clear the current data set selection',
  reducer: (state) => {
    const dataSetSelection = state.dataSetSelection.map(() => false);
    return {
      dataSetSelection,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
