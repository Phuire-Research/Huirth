/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that appends the Muxium Dialog supplied via payload into huirth's state.
$>*/
/*<#*/
/* eslint-disable max-len */
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';

export type huirthAppendMuxiumDialogTypePayload = {
  dialog: string;
};

export const huirthAppendMuxiumDialog = createQualityCardWithPayload<huirthState, huirthAppendMuxiumDialogTypePayload>({
  type: 'huirth append Muxium Dialog',
  reducer: (state, action) => {
    const { dialog } = action.payload;
    return {
      dialog: state.dialog + dialog,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
