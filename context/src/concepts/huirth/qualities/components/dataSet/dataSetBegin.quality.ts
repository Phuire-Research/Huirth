/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the first slice of the DataSet Component.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import { createQualityCardComponent, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const huirthDataSetBegin = createQualityCardComponent({
  type: 'create userInterface for DataSetBegin',
  reducer: nullReducer,
  componentCreator: createMethod(({ action }) => {
    const payload = action.payload;
    const id = '#beginDataSetID' + payload.pageTitle;
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
    <section class="flex flex-col items-center min-h-screen text-white bg-center bg-blend-overlay md:bg-fixed bg-neutral-900/60">
      <div class ="flex-1 mb-12 w-[42rem] max-w-5xl m-10 pt-10 pb-10 bg-gray-800/90 rounded">
        <h1 class="text-3xl text-center p-4">DataSet: ${payload.pageTitle}</h1>
  `,
        })
      );
    }
    return action;
  }),
});
/*#>*/
