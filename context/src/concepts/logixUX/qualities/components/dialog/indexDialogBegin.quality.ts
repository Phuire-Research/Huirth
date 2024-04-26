/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the first slice of the Dialog Component.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import {
  createQualitySetComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const [logixUXIndexDialogBegin, logixUXIndexDialogBeginType, logixUXIndexDialogBeginQuality] = createQualitySetComponent({
  type: 'create userInterface for IndexDialogBegin',
  reducer: nullReducer,
  componentCreator: (act) =>
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
            action: act(payload),
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
    }),
});
/*#>*/
