/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the last slice of the DPO DataSet Component with the proper closing tags.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import {
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const [huirthIndexDPOEnd, huirthIndexDPOEndType, huirthIndexDPOEndQuality] = createQualityCardComponent({
  type: 'create userInterface for IndexDPOEnd',
  reducer: nullReducer,
  componentCreator: (act) =>
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
            action: act(payload),
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
