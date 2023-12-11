/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that set each entry of the data set selection to false.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export const logixUXClearDataSetSelectionType: ActionType = 'logixUX clear the current data set selection';
export const logixUXClearDataSetSelection = prepareActionCreator(logixUXClearDataSetSelectionType);

const logixUXClearDataSetSelectionReducer = (state: LogixUXState, _: Action): LogixUXState => {
  const dataSetSelection = state.dataSetSelection.map(() => false);
  return {
    ...state,
    dataSetSelection,
  };
};

export const logixUXClearDataSetSelectionQuality = createQuality(
  logixUXClearDataSetSelectionType,
  logixUXClearDataSetSelectionReducer,
  defaultMethodCreator
);
/*#>*/
