/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality that will create the final slice for the Data Manager Component.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import { createQualityCardComponent, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const huirthDataManagerEnd = createQualityCardComponent({
  type: 'create userInterface for DataManagerEnd',
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
