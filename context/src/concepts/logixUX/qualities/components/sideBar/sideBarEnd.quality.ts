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

export const logixUXSideBarEndType: ActionType = 'create userInterface for SideBarEnd';
export const logixUXSideBarEnd = prepareActionComponentCreator(logixUXSideBarEndType);

const createSideBarEndMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '#sideBarEnd';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXSideBarEnd(payload),
      html: /*html*/`
  </nav>
</aside> 
`
    }));
  }
  return action;
});

export const logixUXSideBarEndQuality = createQuality(
  logixUXSideBarEndType,
  defaultReducer,
  createSideBarEndMethodCreator,
);
