/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality to create the first slice of the DataSet Component.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  nullReducer,
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
      universal: false,
      action: logixUXDataSetBegin(payload),
      html: /*html*/`
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center min-h-screen text-white bg-center bg-blend-overlay md:bg-fixed bg-neutral-900/60">
    <div class ="flex-1 mb-12 w-[42rem] max-w-5xl m-10 pt-10 pb-10 bg-gray-800/90 rounded">
      <h1 class="text-3xl text-center p-4">DataSet: ${payload.pageTitle}</h1>
`
    }));
  }
  return action;
});

export const logixUXDataSetBeginQuality = createQuality(
  logixUXDataSetBeginType,
  nullReducer,
  createDataSetBeginMethodCreator,
);
/*#>*/