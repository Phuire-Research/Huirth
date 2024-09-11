/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality to be used alongside a User Interface Concept that will add a body element closing tag to the current page composition.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';
import { createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const [htmlBodyEnd, htmlBodyEndType, htmlBodyEndQuality] = createQualityCardComponent({
  type: 'Html create Body End',
  reducer: nullReducer,
  componentCreator: (act) =>
    createMethod((action) => {
      if (action.strategy) {
        const payload = selectComponentPayload(action);
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id: '',
            boundSelectors: [],
            universal: false,
            action: act(payload),
            html: /*html*/ `
    </body>
      `,
          })
        );
      }
      return action;
    }),
});
/*#>*/
