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
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center min-h-screen text-white bg-center bg-blend-overlay md:bg-fixed bg-neutral-900/60">
    <div class ="flex-1 mb-12 max-w-5xl m-10 pt-10 pb-10 bg-gray-800/90 rounded">
      <h1 class="text-3xl text-center p-4">DataManager</h1>
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
