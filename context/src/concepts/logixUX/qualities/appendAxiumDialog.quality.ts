/* eslint-disable max-len */
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export type LogixUXAppendAxiumDialogTypePayload = {
  dialog: string;
};
export const logixUXAppendAxiumDialogType: ActionType = 'logixUX append Axium Dialog';
export const logixUXAppendAxiumDialog = prepareActionWithPayloadCreator<LogixUXAppendAxiumDialogTypePayload>(logixUXAppendAxiumDialogType);

function logixUXAppendAxiumDialogReducer(state: LogixUXState, action: Action): LogixUXState {
  const dialog = selectPayload<LogixUXAppendAxiumDialogTypePayload>(action).dialog;
  return {
    ...state,
    dialog: state.dialog + dialog,
  };
}

export const logixUXAppendAxiumDialogQuality = createQuality(
  logixUXAppendAxiumDialogType,
  logixUXAppendAxiumDialogReducer,
  defaultMethodCreator
);
