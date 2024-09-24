/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a Html head element for a User Interface Concept and the supplied page composition.
$>*/
/*<#*/
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';
import { createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlHeadBegin = createQualityCardComponent({
  type: 'Html create Head Begin',
  reducer: nullReducer,
  componentCreator: createMethod((action) => {
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          universal: false,
          action,
          html: /*html*/ `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
    <script src="/static/scripts/index.mjs"></script>
    `,
        })
      );
    }
    return action;
  }),
});
/*#>*/
