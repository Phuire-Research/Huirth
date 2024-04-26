/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that set each entry of the data set selection to false.
$>*/
/*<#*/
import { Action, createQualitySet, defaultMethodCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export const [logixUXClearDataSetSelection, logixUXClearDataSetSelectionType, logixUXClearDataSetSelectionQuality] = createQualitySet({
  type: 'logixUX clear the current data set selection',
  reducer: (state: LogixUXState, _: Action): LogixUXState => {
    const dataSetSelection = state.dataSetSelection.map(() => false);
    return {
      ...state,
      dataSetSelection,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
