/* eslint-disable max-len */
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';

import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const logixUXHeadType: ActionType = 'Create logixUX Head';
export const logixUXHead = prepareActionCreator(logixUXHeadType);

const createLogixUXHeadMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          selectors: [],
          action: logixUXHead(),
          html: /*html*/ `
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    `,
        })
      );
    }
    return action;
  });

export const logixUXHeadQuality = createQuality(logixUXHeadType, defaultReducer, createLogixUXHeadMethodCreator);
