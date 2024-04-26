/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a html closing element tag to a page composition for a User Interface Concept.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import { createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const [htmlEnd, htmlEndType, htmlEndQuality] = createQualitySetComponent({
  type: 'Create HTML End Element',
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
            universal: false,
            action: act(payload),
            html: /*html*/ `
  </html>
      `,
          })
        );
      }
      return action;
    }),
});
/*#>*/
