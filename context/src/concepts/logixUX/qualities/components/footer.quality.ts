/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality to create the footer component.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import { createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../model/userInterface';

export const [logixUXFooter, logixUXFooterType, logixUXFooterQuality] = createQualitySetComponent({
  type: 'Create logixUX Footer',
  reducer: nullReducer,
  componentCreator: (act) =>
    createMethod((action) => {
      const payload = selectComponentPayload(action);
      if (action.strategy) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id: '',
            boundSelectors: [],
            universal: true,
            action: act(payload),
            html: /*html*/ `
  <footer
    class="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
    <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
      © 2023 Copyright: PHUIRE RESEARCH LLC
    </div>
  </footer>
    `,
          })
        );
      }
      return action;
    }),
});
/*#>*/
