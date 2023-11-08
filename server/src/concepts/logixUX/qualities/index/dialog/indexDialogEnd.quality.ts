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

export const logixUXIndexDialogEndType: ActionType = 'create userInterface for IndexDialogEnd';
export const logixUXIndexDialogEnd = prepareActionCreator(logixUXIndexDialogEndType);

const createIndexDialogEndMethodCreator: MethodCreator = () => createMethod(action => {
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      boundSelectors: [],
      action: logixUXIndexDialogEnd(),
      html: /*html*/`
    </div>
  </section>
</div>
        `
    }));
  }
  return action;
});

export const logixUXIndexDialogEndQuality = createQuality(
  logixUXIndexDialogEndType,
  defaultReducer,
  createIndexDialogEndMethodCreator,
);
