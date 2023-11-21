import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';

import {
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../model/userInterface';

export const logixUXFooterType: ActionType = 'Create logixUX Footer';
export const logixUXFooter = prepareActionComponentCreator(logixUXFooterType);

const createLogixUXFooterMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectComponentPayload(action);
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          action: logixUXFooter(payload),
          html: /*html*/ `
  <footer
    class="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
    <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
      © 2023 Copyright: PHUIRE RESEARCH LLC
    </div>
  </footer>
    `,
        })
      );
    }
    return action;
  });

export const logixUXFooterQuality = createQuality(logixUXFooterType, defaultReducer, createLogixUXFooterMethodCreator);
