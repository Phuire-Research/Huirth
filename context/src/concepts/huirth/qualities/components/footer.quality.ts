/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the footer component.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import { createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../model/userInterface';

export const huirthFooter = createQualityCardComponent({
  type: 'Create huirth Footer',
  reducer: nullReducer,
  componentCreator:
    createMethod(({action}) => {
      if (action.strategy) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id: '',
            boundSelectors: [],
            universal: true,
            action,
            html: /*html*/ `
  <footer
    class="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
    <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
      © 2024 Copyright: PHUIRE RESEARCH LLC
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
