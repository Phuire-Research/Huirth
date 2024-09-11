/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will run a format script within the context directory.
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

export type FormatContextPayload = { contextDir: string };

export const userInterfaceServerFormatContext =
  createQualityCardWithPayload<FormatContextPayload, any>({
    type: 'User Interface Server format Context',
    reducer: nullReducer,
    methodCreator: () =>
      createAsyncMethod((controller, action) => {
        const payload = selectPayload<FormatContextPayload>(action);
        if (action.strategy) {
          exec(`cd ${payload.contextDir} & npm run prettier-format`, (error, stdout, stderr) => {
            if (action.strategy) {
              if (error) {
                console.error('stderr:', stderr);
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
