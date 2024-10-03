/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will create the context index needed to load Stratimux and all unified huirth concepts onto the client.
$>*/
/*<#*/
import {
  ActionStrategy,
  muxiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategySuccess,
} from 'stratimux';
import fs from 'fs/promises';
import path from 'path';
import { PrimedConceptAndProperties } from '../../../model/userInterface';
import { createContextIndexContent } from '../../../model/contextIndex';
import { huirthState } from '../huirth.concept';

export type CreateContextIndexPayload = {
  primedConcepts: PrimedConceptAndProperties[];
  root: string;
  directoryMap: string[];
};

export const userInterfaceServerCreateContextIndex = createQualityCardWithPayload<huirthState, CreateContextIndexPayload>({
  type: 'User Interface Server create Context index.ts',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod(({ controller, action }) => {
      const payload = selectPayload<CreateContextIndexPayload>(action);
      if (action.strategy) {
        const indexTs = path.join(payload.root + '/context/src/index.ts');
        const content = createContextIndexContent(payload.primedConcepts, payload.directoryMap);
        fs.writeFile(indexTs, content).then(() => {
          const newStrategy = strategySuccess(action.strategy as ActionStrategy);
          controller.fire(newStrategy);
        });
      } else {
        controller.fire(muxiumConclude());
      }
    }),
});
/*#>*/
