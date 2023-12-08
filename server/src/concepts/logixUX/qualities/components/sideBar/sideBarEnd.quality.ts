/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for to create the last slice of the Side Bar Component with the necessary closing tags to complete the first slice.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  strategySuccess
} from 'stratimux';

import { prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXSideBarEndType: ActionType = 'create userInterface for SideBarEnd';
export const logixUXSideBarEnd = prepareActionComponentCreator(logixUXSideBarEndType);

const createSideBarEndMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '#sideBarEnd';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      universal: true,
      action: logixUXSideBarEnd(payload),
      html: /*html*/`
  </nav>
</aside> 
`
    }));
  }
  return action;
});

export const logixUXSideBarEndQuality = createQuality(
  logixUXSideBarEndType,
  defaultReducer,
  createSideBarEndMethodCreator,
);
/*#>*/