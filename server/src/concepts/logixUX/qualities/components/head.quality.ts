/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for to create the head content necessary for the logixUX brand page strategies.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  createMethod,
  nullReducer,
  strategySuccess
} from 'stratimux';

import { createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../model/userInterface';

export const [
  logixUXHead,
  logixUXHeadType,
  logixUXHeadQuality
] = createQualitySetComponent({
  type: 'Create logixUX Head',
  reducer: nullReducer,
  componentCreator: (act) => createMethod(
    (action) => {
      const payload = selectComponentPayload(action);
      if (action.strategy) {
        return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
          id: '',
          boundSelectors: [],
          universal: true,
          action: act(payload),
          html: /*html*/`
      <link rel="stylesheet" href="static/output.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      `
        }));
      }
      return action;
    }
  )
});
/*#>*/