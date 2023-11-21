import {
  ActionStrategy,
  ActionType,
  Concept,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess,
} from 'stratimux';
// import { strategyData_appendFailure, strategyData_unifyData } from '../../../model/actionStrategy';
import fs from 'fs/promises';
import path from 'path';
import { PrimedConceptAndProperties } from '../../../model/userInterface';
import { createContextIndexContent } from '../../../model/contextIndex';

export type CreateContextIndexPayload = {
  primedConcepts: PrimedConceptAndProperties[];
  root: string;
  directoryMap: string[];
};
export const userInterfaceServerCreateContextIndexType: ActionType = 'User Interface Server create Context index.ts';
export const userInterfaceServerCreateContextIndex = prepareActionWithPayloadCreator<CreateContextIndexPayload>(
  userInterfaceServerCreateContextIndexType
);

const createCreateContextIndexMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const payload = selectPayload<CreateContextIndexPayload>(action);
    if (action.strategy) {
      const indexTs = path.join(payload.root + '/context/src/index.ts');
      const content = createContextIndexContent(payload.primedConcepts, payload.directoryMap);
      console.log('TEST', indexTs, content);
      fs.writeFile(indexTs, content).then(() => {
        const newStrategy = strategySuccess(action.strategy as ActionStrategy);
        controller.fire(newStrategy);
      });
    } else {
      controller.fire(axiumConclude());
    }
  });

export const userInterfaceServerCreateContextIndexQuality = createQuality(
  userInterfaceServerCreateContextIndexType,
  defaultReducer,
  createCreateContextIndexMethodCreator
);
