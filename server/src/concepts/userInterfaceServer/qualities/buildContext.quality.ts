/*<$
For the framework Stratimux and the User Interface Server Concept, generate a quality that will build trigger a build script within the context directory.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyData_appendFailure,
  strategyFailed,
  strategySuccess,
} from 'stratimux';
import {exec} from 'child_process';

export type BuildContextPayload = {contextDir: string};
export const userInterfaceServerBuildContextType: ActionType = 'User Interface Server build Context';
export const userInterfaceServerBuildContext =
  prepareActionWithPayloadCreator<BuildContextPayload>(userInterfaceServerBuildContextType);

const createBuildContextMethodCreator: MethodCreator = () => createAsyncMethod(
  (controller, action) => {
    const payload = selectPayload<BuildContextPayload>(action);
    if (action.strategy) {
      exec(`cd ${payload.contextDir} & npm run build`, (error, stdout, stderr) => {
        if (action.strategy) {
          if (error) {
            console.error(`error: ${error}, stdout: ${stdout}, stderr: ${stderr}`);
            controller.fire(
              strategyFailed(action.strategy, strategyData_appendFailure(action.strategy, stderr))
            );
          } else {
            console.log(stdout);
            controller.fire(
              strategySuccess(action.strategy)
            );
          }
        } else {
          controller.fire(axiumConclude());
        }
        console.log(stdout);
      });
    } else {
      controller.fire(axiumConclude());
    }
  }
);

export const userInterfaceServerBuildContextQuality = createQuality(
  userInterfaceServerBuildContextType,
  defaultReducer,
  createBuildContextMethodCreator,
);
/*#>*/