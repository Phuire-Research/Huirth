/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that appends the Axium Dialog supplied via payload into logixUX's state.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export type LogixUXAppendAxiumDialogTypePayload = {
  dialog: string;
}

export const [
  logixUXAppendAxiumDialog,
  logixUXAppendAxiumDialogType,
  logixUXAppendAxiumDialogQuality
] = createQualitySetWithPayload<LogixUXAppendAxiumDialogTypePayload>({
  type: 'logixUX append Axium Dialog',
  reducer: (state: LogixUXState, action: Action): LogixUXState => {
    const dialog = selectPayload<LogixUXAppendAxiumDialogTypePayload>(action).dialog;
    return {
      ...state,
      dialog: state.dialog + dialog
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/