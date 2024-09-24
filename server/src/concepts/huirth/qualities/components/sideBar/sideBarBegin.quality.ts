/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the first slice of the Side Bar Component.
$>*/
/*<#*/
/* eslint-disable max-len */
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import {
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const huirthSideBarBegin = createQualityCardComponent({
  type: 'create userInterface for SideBarBegin',
  reducer: nullReducer,
  componentCreator:
    createMethod((action) => {
      // console.log('SIDEBAR BEGIN', action.strategy);
      const payload = action.payload;
      const id = '#sideBarBegin';
      if (action.strategy) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            boundSelectors: [],
            universal: true,
            action,
            html: /*html*/ `
<aside id=${id} class="fixed left-0 top-0 bottom-0 h-screen w-min overflow-y-scroll bg-white">
  <nav class="h-full flex flex-col bg-gray-200 border-r shadow-sm">
`,
          })
        );
      }
      return action;
    }),
});
/*#>*/
