import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export const logixUXUpdateFromPayloadType: ActionType = 'Create logixUX UpdateFromPayload';
export const logixUXUpdateFromPayload =
  prepareActionCreator(logixUXUpdateFromPayloadType);

function logixUXUpdateFromPayloadReducer(state: LogixUXState, action: Action): LogixUXState {
  const target = userInterface_selectInputTarget(action);
  console.log('CHECK VALUE', target.value);
  return {
    ...state
  };
}

export const logixUXUpdateFromPayloadQuality = createQuality(
  logixUXUpdateFromPayloadType,
  logixUXUpdateFromPayloadReducer,
  defaultMethodCreator
);