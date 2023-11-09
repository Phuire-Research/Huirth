/* eslint-disable max-len */
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess
} from 'stratimux';

import { userInterface_appendCompositionToPage, userInterface_selectPage } from '../../../model/userInterface';

export const htmlHeadEndType: ActionType = 'Html create Head End';
export const htmlHeadEnd = prepareActionCreator(htmlHeadEndType);

const createHtmlHeadMethodCreator: MethodCreator = () => createMethod(
  (action) => {
    if (action.strategy) {
      return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
        id: '',
        boundSelectors: [],
        action: htmlHeadEnd(),
        html: /*html*/`
  </head>
    `
      }));
    }
    return action;
  }
);

export const htmlHeadEndQuality = createQuality(
  htmlHeadEndType,
  defaultReducer,
  createHtmlHeadMethodCreator,
);