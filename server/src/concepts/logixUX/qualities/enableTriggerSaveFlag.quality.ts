import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export const logixUXEnableTriggerSaveFlagType: ActionType = 'logixUX push saveTrainingData action to Server';
export const logixUXEnableTriggerSaveFlag =
  prepareActionCreator(logixUXEnableTriggerSaveFlagType);

// Better flow would be to edit all payload to be forced into the Record<string, unknown> format.
// Very important for when I am not in a build competition.

function logixUXEnableTriggerSaveFlagReducer(state: LogixUXState, _: Action): LogixUXState {
  console.log('TRIGGER SAVE', true);
  return {
    ...state,
    triggerSave: true
  };
}

export const logixUXEnableTriggerSaveFlagQuality = createQuality(
  logixUXEnableTriggerSaveFlagType,
  logixUXEnableTriggerSaveFlagReducer,
  defaultMethodCreator,
);