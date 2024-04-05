/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the first slice of the Dialog Component.
$>*/
/*<#*/
import { ActionType, MethodCreator, createMethod, createQuality, nullReducer, strategySuccess } from 'stratimux';

import {
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const logixUXIndexDialogBeginType: ActionType = 'create userInterface for IndexDialogBegin';
export const logixUXIndexDialogBegin = prepareActionComponentCreator(logixUXIndexDialogBeginType);

const createIndexDialogBeginMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectComponentPayload(action);
    const id = '#dialogBeginID';
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          universal: false,
          action: logixUXIndexDialogBegin(payload),
          html: /*html*/ `
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center bg-gradient-to-br from-60% from-black to-transparent to-black min-h-screen text-white">
    <div class ="flex-1 mb-12 max-w-3xl m-10 pt-10 pb-10">
      <h1 class="text-3xl text-center p-4">Stratimux Dialog Output</h1>
`,
        })
      );
    }
    return action;
  });

export const logixUXIndexDialogBeginQuality = createQuality(logixUXIndexDialogBeginType, nullReducer, createIndexDialogBeginMethodCreator);
/*#>*/
