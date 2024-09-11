/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will build trigger a build script within the context directory.
$>*/
/*<#*/
import {
  axiumConclude,
  createAsyncMethod,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import { exec } from 'child_process';

export type BuildContextPayload = { contextDir: string };

export const userInterfaceServerBuildContext =
  createQualityCardWithPayload<BuildContextPayload, any>({
    type: 'User Interface Server build Context',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethod((controller, action) => {
        const payload = selectPayload<BuildContextPayload>(action);
        if (action.strategy) {
          exec(`cd ${payload.contextDir} & npm run build`, (error, stdout, stderr) => {
            if (action.strategy) {
              if (error) {
                console.error(`error: ${error}, stdout: ${stdout}, stderr: ${stderr}`);
                controller.fire(strategyFailed(action.strategy, strategyData_appendFailure(action.strategy, stderr)));
              } else {
                console.log('stdout:', stdout);
                controller.fire(strategySuccess(action.strategy));
              }
            } else {
              controller.fire(axiumConclude());
            }
            console.log('stdout:', stdout);
          });
        } else {
          controller.fire(axiumConclude());
        }
      }),
  });
/*#>*/
