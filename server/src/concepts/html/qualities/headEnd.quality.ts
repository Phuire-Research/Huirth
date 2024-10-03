/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a head element closing tag for a User Interface Concept and supplied page composition.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from 'stratimux';
import { createQualityCardComponent, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlHeadEnd = createQualityCardComponent({
  type: 'Html create Head End',
  reducer: nullReducer,
  componentCreator: createMethod(({ action }) => {
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          universal: false,
          action,
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
