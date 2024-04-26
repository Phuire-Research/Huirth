/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for to create the last slice of the Side Bar Component with the necessary closing tags to complete the first slice.
$>*/
/*<#*/
/* eslint-disable max-len */
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import {
  createQualitySetComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const [logixUXSideBarEnd, logixUXSideBarEndType, logixUXSideBarEndQuality] = createQualitySetComponent({
  type: 'create userInterface for SideBarEnd',
  reducer: nullReducer,
  componentCreator: (act) =>
    createMethod((action) => {
      const payload = selectComponentPayload(action);
      const id = '#sideBarEnd';
      if (action.strategy) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            boundSelectors: [],
            universal: true,
            action: act(payload),
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
