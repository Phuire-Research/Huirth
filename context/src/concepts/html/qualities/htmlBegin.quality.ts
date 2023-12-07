/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a html element to a page composition for a User Interface Concept.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess,
} from 'stratimux';

import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export type HtmlBeginPayload = {
  language?: string;
};
export const htmlBeginType: ActionType = 'Create HTML Element';
export const htmlBegin = prepareActionWithPayloadCreator<HtmlBeginPayload>(htmlBeginType);

const createHtmlHeadMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    if (action.strategy) {
      const payload = selectPayload<HtmlBeginPayload>(action);
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          universal: false,
          action: htmlBegin(payload),
          html: /*html*/ `
<!DOCTYPE html>
<html lang="${payload.language ? payload.language : 'en'}">
    `,
        })
      );
    }
    return action;
  });

export const htmlBeginQuality = createQuality(htmlBeginType, defaultReducer, createHtmlHeadMethodCreator);
/*#>*/
