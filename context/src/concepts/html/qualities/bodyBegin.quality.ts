/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality for a User Interface Concept that will add a html body element with the supplied page id.
$>*/
/*<#*/
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, strategySuccess } from 'stratimux';
import {
  createPageId,
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../model/userInterface';

export const htmlBodyBeginType: ActionType = 'Html create Body Begin';
export const htmlBodyBegin = prepareActionComponentCreator(htmlBodyBeginType);

const createHtmlBodyMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectComponentPayload(action);
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          universal: false,
          action: htmlBodyBegin(payload),
          html: /*html*/ `
  <body id="${createPageId(payload.pageTitle)}">
    `,
        })
      );
    }
    return action;
  });

export const htmlBodyBeginQuality = createQuality(htmlBodyBeginType, defaultReducer, createHtmlBodyMethodCreator);
/*#>*/
