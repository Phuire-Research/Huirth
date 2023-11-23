/*<$
For the framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the last slice of the Dialog Component with the necessary closing element tags.
$>*/
/*<#*/
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, strategySuccess } from 'stratimux';

import {
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const logixUXIndexDialogEndType: ActionType = 'create userInterface for IndexDialogEnd';
export const logixUXIndexDialogEnd = prepareActionComponentCreator(logixUXIndexDialogEndType);

const createIndexDialogEndMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectComponentPayload(action);
    const id = '';
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          action: logixUXIndexDialogEnd(payload),
          html: /*html*/ `
    </div>
  </section>
</div>
        `,
        })
      );
    }
    return action;
  });

export const logixUXIndexDialogEndQuality = createQuality(logixUXIndexDialogEndType, defaultReducer, createIndexDialogEndMethodCreator);
