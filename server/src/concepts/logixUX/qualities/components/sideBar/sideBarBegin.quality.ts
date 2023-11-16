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

export const logixUXSideBarBeginType: ActionType = 'create userInterface for SideBarBegin';
export const logixUXSideBarBegin = prepareActionComponentCreator(logixUXSideBarBeginType);

const createSideBarBeginMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '#sideBarBegin';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXSideBarBegin(payload),
      html: /*html*/`
<aside id=${id} class="fixed left-0 top-0 h-screen w-min">
  <nav class="h-full flex flex-col bg-white border-r shadow-sm">
`
    }));
  }
  return action;
});

export const logixUXSideBarBeginQuality = createQuality(
  logixUXSideBarBeginType,
  defaultReducer,
  createSideBarBeginMethodCreator,
);
