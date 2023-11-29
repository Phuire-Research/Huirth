/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that set the current selected transformation to the incoming target value.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export const logixUXSetSelectedTransformationType: ActionType = 'logixUX set the currently selected transformation';
export const logixUXSetSelectedTransformation =
  prepareActionCreator(logixUXSetSelectedTransformationType);

const logixUXSetSelectedTransformationReducer = (state: LogixUXState, action: Action): LogixUXState => {
  const target = userInterface_selectInputTarget(action);
  const value = target.value;
  // eslint-disable-next-line no-useless-escape
  return {
    ...state,
    selectedTransformation: value
  };
};

export const logixUXSetSelectedTransformationQuality = createQuality(
  logixUXSetSelectedTransformationType,
  logixUXSetSelectedTransformationReducer,
);
/*#>*/