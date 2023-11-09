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

export type FormatContextPayload = {contextDir: string};
export const userInterfaceServerFormatContextType: ActionType = 'User Interface Server format Context';
export const userInterfaceServerFormatContext =
  prepareActionWithPayloadCreator<FormatContextPayload>(userInterfaceServerFormatContextType);

const createFormatContextMethodCreator: MethodCreator = () => createAsyncMethod(
  (controller, action) => {
    const payload = selectPayload<FormatContextPayload>(action);
    if (action.strategy) {
      exec(`cd ${payload.contextDir} & npm run prettier-format`, (error, stdout, stderr) => {
        if (action.strategy) {
          if (error) {
            console.error(stderr);
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

export const userInterfaceServerFormatContextQuality = createQuality(
  userInterfaceServerFormatContextType,
  defaultReducer,
  createFormatContextMethodCreator,
);