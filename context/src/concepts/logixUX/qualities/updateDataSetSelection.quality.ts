/*<$
For the framework Stratimux and a Concept logixUX, generate a quality that updates a DataSet's selection within state by index by toggling the boolean value.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export type LogixUXUpdateDataSetSelectionPayload = {
  index: number;
};
export const logixUXUpdateDataSetSelectionType: ActionType = 'Create logixUX update data set selection';
export const logixUXUpdateDataSetSelection = prepareActionWithPayloadCreator(logixUXUpdateDataSetSelectionType);

function logixUXUpdateDataSetSelectionReducer(state: LogixUXState, action: Action): LogixUXState {
  const { index } = selectPayload<LogixUXUpdateDataSetSelectionPayload>(action);
  const dataSetSelection = [...state.dataSetSelection];
  if (dataSetSelection[index]) {
    dataSetSelection[index] = !dataSetSelection[index];
  }
  return {
    ...state,
    dataSetSelection,
  };
}

export const logixUXUpdateDataSetSelectionQuality = createQuality(
  logixUXUpdateDataSetSelectionType,
  logixUXUpdateDataSetSelectionReducer,
  defaultMethodCreator
);
/*#>*/
