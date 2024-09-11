/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a head element closing tag for a User Interface Concept and supplied page composition.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';
import { createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const [htmlHeadEnd, htmlHeadEndType, htmlHeadEndQuality] = createQualityCardComponent({
  type: 'Html create Head End',
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
    </head>
      `,
          })
        );
      }
      return action;
    }),
});
/*#>*/
