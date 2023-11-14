import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export const logixUXDisableTriggerSaveFlagType: ActionType = 'logixUX disable Trigger Save';
export const logixUXDisableTriggerSaveFlag = prepareActionCreator(logixUXDisableTriggerSaveFlagType);

// Better flow would be to edit all payload to be forced into the Record<string, unknown> format.
// Very important for when I am not in a build competition.

function logixUXDisableTriggerSaveFlagReducer(state: LogixUXState, _: Action): LogixUXState {
  console.log('TRIGGER SAVE', false);
  return {
    ...state,
    triggerSave: false,
  };
}

export const logixUXDisableTriggerSaveFlagQuality = createQuality(
  logixUXDisableTriggerSaveFlagType,
  logixUXDisableTriggerSaveFlagReducer,
  defaultMethodCreator
);
