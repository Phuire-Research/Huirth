/* eslint-disable max-len */
import {
  ActionType,
  KeyedSelector,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess
} from 'stratimux';

import { userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXIndexDialogContentType: ActionType = 'create userInterface for IndexDialogContent';
export const logixUXIndexDialogContent = prepareActionCreator(logixUXIndexDialogContentType);

const axiumSelectDialog: KeyedSelector = {
  conceptName: 'axium',
  stateKeys: 'dialog'
};

const createIndexDialogContentMethodCreator: MethodCreator = () => createMethod(action => {
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      selectors: [{
        action: logixUXIndexDialogContent(),
        selector: [axiumSelectDialog]
      }],
      action: logixUXIndexDialogContent(),
      html: /*html*/`
      <p class="pb-2 indent-4">
        TEST
      </p>
`
    }));
  }
  return action;
});

export const logixUXIndexDialogContentQuality = createQuality(
  logixUXIndexDialogContentType,
  defaultReducer,
  createIndexDialogContentMethodCreator,
);

function renderDialog(dialog: string) {
  //
}