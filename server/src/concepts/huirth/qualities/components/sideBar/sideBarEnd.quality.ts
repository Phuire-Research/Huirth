/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for to create the last slice of the Side Bar Component with the necessary closing tags to complete the first slice.
$>*/
/*<#*/
/* eslint-disable max-len */
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import {
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const huirthSideBarEnd = createQualityCardComponent({
  type: 'create userInterface for SideBarEnd',
  reducer: nullReducer,
  componentCreator:
    createMethod((action) => {
      const payload = action.payload;
      const id = '#sideBarEnd';
      if (action.strategy) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            boundSelectors: [],
            universal: true,
            action,
            html: /*html*/ `
  </nav>
</aside> 
`,
          })
        );
      }
      return action;
    }),
});
/*#>*/
