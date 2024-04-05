/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality that will create the final slice for the Data Manager Component.
$>*/
/*<#*/
import { ActionType, MethodCreator, createMethod, createQuality, nullReducer, strategySuccess } from 'stratimux';

import {
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const logixUXDataManagerEndType: ActionType = 'create userInterface for DataManagerEnd';
export const logixUXDataManagerEnd = prepareActionComponentCreator(logixUXDataManagerEndType);

const createDataManagerEndMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectComponentPayload(action);
    const id = '';
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          universal: false,
          action: logixUXDataManagerEnd(payload),
          html: /*html*/ `
    </div>
  </section>
</div>
        `,
        })
      );
    }
    return action;
  });

export const logixUXDataManagerEndQuality = createQuality(logixUXDataManagerEndType, nullReducer, createDataManagerEndMethodCreator);
/*#>*/
