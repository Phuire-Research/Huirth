/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a html element to a page composition for a User Interface Concept.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  nullReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess,
} from '@phuire/stratimux';

import { createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export type HtmlBeginPayload = {
  language?: string;
};

export const [htmlBegin, htmlBeginType, htmlBeginQuality] = createQualityCardComponent<HtmlBeginPayload>({
  type: 'Create HTML Element',
  reducer: nullReducer,
  componentCreator: (act) =>
    createMethod((action) => {
      if (action.strategy) {
        const payload = selectComponentPayload<HtmlBeginPayload>(action);
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id: '',
            boundSelectors: [],
            universal: false,
            action: act(payload),
            html: /*html*/ `
  <!DOCTYPE html>
  <html lang="${payload.language ? payload.language : 'en'}">
      `,
          })
        );
      }
      return action;
    }),
});
/*#>*/
