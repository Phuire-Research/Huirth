/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a html closing element tag to a page composition for a User Interface Concept.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import { createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlEnd = createQualityCardComponent({
  type: 'Create HTML End Element',
  reducer: nullReducer,
  componentCreator:
    createMethod(({action}) => {
      const payload = action.payload;
      if (action.strategy) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id: '',
            boundSelectors: [],
            universal: false,
            action,
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
