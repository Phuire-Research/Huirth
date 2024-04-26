/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality that will create the final slice for the Data Manager Component.
$>*/
/*<#*/
import {
  createMethod,
  nullReducer,
  strategySuccess
} from 'stratimux';

import { createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const [
  logixUXDataManagerEnd,
  logixUXDataManagerEndType,
  logixUXDataManagerEndQuality
] = createQualitySetComponent({
  type: 'create userInterface for DataManagerEnd',
  reducer: nullReducer,
  componentCreator: (act) => createMethod(action => {
    const payload = selectComponentPayload(action);
    const id = '';
    if (action.strategy) {
      return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
        id,
        boundSelectors: [],
        universal: false,
        action: act(payload),
        html: /*html*/`
      </div>
    </section>
  </div>
          `
      }));
    }
    return action;
  })
});
/*#>*/