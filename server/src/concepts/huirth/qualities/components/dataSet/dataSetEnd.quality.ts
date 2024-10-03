/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality to create the final slice of the DataSet Component with the necessary closing element tags.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import {
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const huirthDataSetEnd = createQualityCardComponent({
  type: 'create userInterface for DataSetEnd',
  reducer: nullReducer,
  componentCreator: createMethod(({ action }) => {
    const payload = action.payload;
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
