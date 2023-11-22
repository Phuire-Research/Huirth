/*<$
For the framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the first slice of the DPO DataSet Component.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  strategySuccess
} from 'stratimux';

import { prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXIndexDPOBeginType: ActionType = 'create userInterface for IndexDPOBegin';
export const logixUXIndexDPOBegin = prepareActionComponentCreator(logixUXIndexDPOBeginType);

const createIndexDPOBeginMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '#beginDPOID' + payload.pageTitle;
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXIndexDPOBegin(payload),
      html: /*html*/`
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center min-h-screen text-white bg-center bg-blend-overlay md:bg-fixed bg-neutral-900/60">
    <div class ="flex-1 mb-12 max-w-5xl m-10 pt-10 pb-10 bg-gray-800/90 rounded">
      <h1 class="text-3xl text-center p-4">DPO Training Set</h1>
`
    }));
  }
  return action;
});

export const logixUXIndexDPOBeginQuality = createQuality(
  logixUXIndexDPOBeginType,
  defaultReducer,
  createIndexDPOBeginMethodCreator,
);
/*#>*/