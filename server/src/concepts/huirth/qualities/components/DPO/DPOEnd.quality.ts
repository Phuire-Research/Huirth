/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the last slice of the DPO DataSet Component with the proper closing tags.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import {
  createQualityCardComponent,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const huirthIndexDPOEnd = createQualityCardComponent({
  type: 'create userInterface for IndexDPOEnd',
  reducer: nullReducer,
  componentCreator:
    createMethod(({action}) => {
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
