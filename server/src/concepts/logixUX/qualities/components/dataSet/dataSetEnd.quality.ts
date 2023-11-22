/*<$
For the framework Stratimux and a Concept logixUX, generate a User Interface Component quality to create the final slice of the DataSet Component with the necessary closing element tags.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  strategySuccess
} from 'stratimux';

import { prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXDataSetEndType: ActionType = 'create userInterface for DataSetEnd';
export const logixUXDataSetEnd = prepareActionComponentCreator(logixUXDataSetEndType);

const createDataSetEndMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXDataSetEnd(payload),
      html: /*html*/`
    </div>
  </section>
</div>
        `
    }));
  }
  return action;
});

export const logixUXDataSetEndQuality = createQuality(
  logixUXDataSetEndType,
  defaultReducer,
  createDataSetEndMethodCreator,
);
