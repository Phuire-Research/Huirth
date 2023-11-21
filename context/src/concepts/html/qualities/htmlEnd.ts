/* eslint-disable max-len */
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
