/* eslint-disable max-len */
import {
  ActionType,
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

const createIndexDialogContentMethodCreator: MethodCreator = () => createMethod(action => {
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      selectors: [],
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
