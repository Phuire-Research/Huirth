/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality to create the final slice of the DataSet Component with the necessary closing element tags.
$>*/
/*<#*/
import {
  createMethod,
  nullReducer,
  strategySuccess
} from 'stratimux';

import { createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const [
  logixUXDataSetEnd,
  logixUXDataSetEndType,
  logixUXDataSetEndQuality
] = createQualitySetComponent({
  type: 'create userInterface for DataSetEnd',
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