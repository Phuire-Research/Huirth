/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a html closing element tag to a page composition for a User Interface Concept.
$>*/
/*<#*/
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';

import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlEndType: ActionType = 'Create HTML End Element';
export const htmlEnd = prepareActionCreator(htmlEndType);

const createHtmlHeadMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          universal: false,
          action: htmlEnd(),
          html: /*html*/ `
</html>
    `,
        })
      );
    }
    return action;
  });

export const htmlEndQuality = createQuality(htmlEndType, defaultReducer, createHtmlHeadMethodCreator);
/*#>*/
