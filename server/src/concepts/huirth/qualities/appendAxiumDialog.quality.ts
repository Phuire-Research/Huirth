/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that appends the Axium Dialog supplied via payload into huirth's state.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { huirthState } from '../huirth.concept';

export type huirthAppendAxiumDialogTypePayload = {
  dialog: string;
}

export const [
  huirthAppendAxiumDialog,
  huirthAppendAxiumDialogType,
  huirthAppendAxiumDialogQuality
] = createQualitySetWithPayload<huirthAppendAxiumDialogTypePayload>({
  type: 'huirth append Axium Dialog',
  reducer: (state: huirthState, action: Action): huirthState => {
    const dialog = selectPayload<huirthAppendAxiumDialogTypePayload>(action).dialog;
    console.log('CHECK DIALOG 2', dialog);
    return {
      ...state,
      dialog: state.dialog + dialog
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/