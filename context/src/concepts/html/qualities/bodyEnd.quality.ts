/* eslint-disable max-len */
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';

import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlBodyEndType: ActionType = 'Html create Body End';
export const htmlBodyEnd = prepareActionCreator(htmlBodyEndType);

const createHtmlBodyMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          action: htmlBodyEnd(),
          html: /*html*/ `
  </body>
    `,
        })
      );
    }
    return action;
  });

export const htmlBodyEndQuality = createQuality(htmlBodyEndType, defaultReducer, createHtmlBodyMethodCreator);
