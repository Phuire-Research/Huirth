/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will append a html element to a page composition for a User Interface Concept.
$>*/
/*<#*/
import {
  createMethod,
  nullReducer,
  strategySuccess,
} from '@phuire/stratimux';

import { ActionComponentPayload, createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';
import { HtmlState } from '../html.concepts';

export type HtmlBeginPayload = {
  language?: string;
} & ActionComponentPayload;

export const htmlBegin = createQualityCardComponent<HtmlState, HtmlBeginPayload>({
  type: 'Create HTML Element',
  reducer: nullReducer,
  componentCreator:
    createMethod(({action}) => {
      if (action.strategy) {
        const payload = action.payload;
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id: '',
            boundSelectors: [],
            universal: false,
            action,
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
