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

export const logixUXDataManagerEndType: ActionType = 'create userInterface for DataManagerEnd';
export const logixUXDataManagerEnd = prepareActionComponentCreator(logixUXDataManagerEndType);

const createDataManagerEndMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXDataManagerEnd(payload),
      html: /*html*/`
    </div>
  </section>
</div>
        `
    }));
  }
  return action;
});

export const logixUXDataManagerEndQuality = createQuality(
  logixUXDataManagerEndType,
  defaultReducer,
  createDataManagerEndMethodCreator,
);
