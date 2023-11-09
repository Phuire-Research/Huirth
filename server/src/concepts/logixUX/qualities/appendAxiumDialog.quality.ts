/* eslint-disable max-len */
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concepts';

export type LogixUXAppendAxiumDialogTypePayload = {
  dialog: string;
}
export const logixUXAppendAxiumDialogType: ActionType = 'logixUX append Axium Dialog';
export const logixUXAppendAxiumDialog = prepareActionWithPayloadCreator<LogixUXAppendAxiumDialogTypePayload>(logixUXAppendAxiumDialogType);

let num = 0;
function logixUXAppendAxiumDialogReducer(state: LogixUXState, action: Action): LogixUXState {
  const dialog = selectPayload<LogixUXAppendAxiumDialogTypePayload>(action).dialog;
  console.log('HIT ', num);
  num++;
  return {
    ...state,
    dialog: state.dialog + dialog
  };
}

export const logixUXAppendAxiumDialogQuality = createQuality(
  logixUXAppendAxiumDialogType,
  logixUXAppendAxiumDialogReducer,
  defaultMethodCreator
);
