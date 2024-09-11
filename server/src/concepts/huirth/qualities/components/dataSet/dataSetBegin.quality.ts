/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the first slice of the DataSet Component.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import {
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const [huirthDataSetBegin, huirthDataSetBeginType, huirthDataSetBeginQuality] = createQualityCardComponent({
  type: 'create userInterface for DataSetBegin',
  reducer: nullReducer,
  componentCreator: (act) =>
    createMethod((action) => {
      const payload = selectComponentPayload(action);
      const id = '#beginDataSetID' + payload.pageTitle;
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
