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

export const logixUXDataSetBeginType: ActionType = 'create userInterface for DataSetBegin';
export const logixUXDataSetBegin = prepareActionComponentCreator(logixUXDataSetBeginType);

const createDataSetBeginMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '#beginDataSetID' + payload.pageTitle;
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXDataSetBegin(payload),
      html: /*html*/`
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center min-h-screen text-white bg-center bg-blend-overlay md:bg-fixed bg-neutral-900/60">
    <div class ="flex-1 mb-12 max-w-5xl m-10 pt-10 pb-10 bg-gray-800/90 rounded">
      <h1 class="text-3xl text-center p-4">DataSet: ${payload.pageTitle}</h1>
`
    }));
  }
  return action;
});

export const logixUXDataSetBeginQuality = createQuality(
  logixUXDataSetBeginType,
  defaultReducer,
  createDataSetBeginMethodCreator,
);
