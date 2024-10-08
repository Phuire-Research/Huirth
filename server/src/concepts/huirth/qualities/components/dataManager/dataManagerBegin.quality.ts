/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality that will create the Data Manager's initial slice and append to the page composition data field.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import { createQualityCardComponent, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const huirthDataManagerBegin = createQualityCardComponent({
  type: 'create userInterface for DataManagerBegin',
  reducer: nullReducer,
  componentCreator: createMethod(({ action }) => {
    const payload = action.payload;
    const id = '#beginDataManagerID' + payload.pageTitle;
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          universal: false,
          boundSelectors: [],
          action,
          html: /*html*/ `
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center min-h-screen text-white bg-center bg-blend-overlay md:bg-fixed bg-neutral-900/60">
    <div class ="flex-1 mb-12 w-[50rem] max-w-5xl m-10 pt-10 pb-10 bg-gray-800/90 rounded">
      <h1 class="text-3xl text-center p-4 mb-2">Data Manager</h1>
`,
        })
      );
    }
    return action;
  }),
});
/*#>*/
