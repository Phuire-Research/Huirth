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

import { prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXIndexTrainingDataEndType: ActionType = 'create userInterface for IndexTrainingDataEnd';
export const logixUXIndexTrainingDataEnd = prepareActionComponentCreator(logixUXIndexTrainingDataEndType);

const createIndexTrainingDataEndMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXIndexTrainingDataEnd(payload),
      html: /*html*/`
    </div>
  </section>
</div>
        `
    }));
  }
  return action;
});

export const logixUXIndexTrainingDataEndQuality = createQuality(
  logixUXIndexTrainingDataEndType,
  defaultReducer,
  createIndexTrainingDataEndMethodCreator,
);
