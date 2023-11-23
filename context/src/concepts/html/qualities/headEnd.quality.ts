/*<$
For the framework Stratimux and Html Concept, generate a quality that will append a head element closing tag for a User Interface Concept and supplied page composition.
$>*/
/*<#*/
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';
import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlHeadEndType: ActionType = 'Html create Head End';
export const htmlHeadEnd = prepareActionCreator(htmlHeadEndType);

const createHtmlHeadMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          action: htmlHeadEnd(),
          html: /*html*/ `
  </head>
    `,
        })
      );
    }
    return action;
  });

export const htmlHeadEndQuality = createQuality(htmlHeadEndType, defaultReducer, createHtmlHeadMethodCreator);
/*#>*/
