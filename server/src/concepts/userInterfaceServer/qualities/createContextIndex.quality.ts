/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will create the context's index file to dictate the execution of the client page script.
$>*/
/*<#*/
import {
  ActionStrategy,
  ActionType,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  nullReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess
} from 'stratimux';
import fs from 'fs/promises';
import path from 'path';
import { PrimedConceptAndProperties } from '../../../model/userInterface';
import { createContextIndexContent } from '../../../model/contextIndex';

export type CreateContextIndexPayload = {
  primedConcepts: PrimedConceptAndProperties[],
  root: string,
  directoryMap: string[]
};
export const userInterfaceServerCreateContextIndexType: ActionType = 'User Interface Server create Context index.ts';
export const userInterfaceServerCreateContextIndex =
  prepareActionWithPayloadCreator<CreateContextIndexPayload>(userInterfaceServerCreateContextIndexType);

const createCreateContextIndexMethodCreator: MethodCreator = () => createAsyncMethod(
  (controller, action) => {
    const payload = selectPayload<CreateContextIndexPayload>(action);
    if (action.strategy) {
      const indexTs = path.join(payload.root + '/context/src/index.ts');
      const content = createContextIndexContent(payload.primedConcepts, payload.directoryMap);
      fs.writeFile(indexTs, content).then(() => {
        const newStrategy =
          strategySuccess(action.strategy as ActionStrategy);
        controller.fire(newStrategy);
      });
    } else {
      controller.fire(axiumConclude());
    }
  }
);

export const userInterfaceServerCreateContextIndexQuality = createQuality(
  userInterfaceServerCreateContextIndexType,
  nullReducer,
  createCreateContextIndexMethodCreator,
);
/*#>*/