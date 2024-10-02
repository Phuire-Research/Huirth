/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the last slice of the Dialog Component with the necessary closing element tags.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import { createQualityCardComponent, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const huirthIndexDialogEnd = createQualityCardComponent({
  type: 'create userInterface for IndexDialogEnd',
  reducer: nullReducer,
  componentCreator: createMethod(({ action }) => {
    const id = '';
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          universal: false,
          action,
          html: /*html*/ `
    </div>
  </section>
</div>
        `,
        })
      );
    }
    return action;
  }),
});
/*#>*/
