/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality to create the first slice of the Side Bar Component.
$>*/
/*<#*/
/* eslint-disable max-len */
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, strategySuccess } from 'stratimux';

import {
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const logixUXSideBarBeginType: ActionType = 'create userInterface for SideBarBegin';
export const logixUXSideBarBegin = prepareActionComponentCreator(logixUXSideBarBeginType);

const createSideBarBeginMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectComponentPayload(action);
    const id = '#sideBarBegin';
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          action: logixUXSideBarBegin(payload),
          html: /*html*/ `
<aside id=${id} class="fixed left-0 top-0 bottom-0 h-screen w-min overflow-y-scroll bg-white">
  <nav class="h-full flex flex-col bg-gray-200 border-r shadow-sm">
`,
        })
      );
    }
    return action;
  });

export const logixUXSideBarBeginQuality = createQuality(logixUXSideBarBeginType, defaultReducer, createSideBarBeginMethodCreator);
/*#>*/
