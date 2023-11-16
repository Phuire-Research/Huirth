/* eslint-disable max-len */
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  strategySuccess
} from 'stratimux';

import { prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXIndexDPOEndType: ActionType = 'create userInterface for IndexDPOEnd';
export const logixUXIndexDPOEnd = prepareActionComponentCreator(logixUXIndexDPOEndType);

const createIndexDPOEndMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXIndexDPOEnd(payload),
      html: /*html*/`
    </div>
  </section>
</div>
        `
    }));
  }
  return action;
});

export const logixUXIndexDPOEndQuality = createQuality(
  logixUXIndexDPOEndType,
  defaultReducer,
  createIndexDPOEndMethodCreator,
);
