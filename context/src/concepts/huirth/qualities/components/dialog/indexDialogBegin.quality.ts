/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the first slice of the Dialog Component.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import {
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const huirthIndexDialogBegin = createQualityCardComponent({
  type: 'create userInterface for IndexDialogBegin',
  reducer: nullReducer,
  componentCreator: createMethod(({ action }) => {
    const payload = action.payload;
    const id = '#dialogBeginID';
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          universal: false,
          action,
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
