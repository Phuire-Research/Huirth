import {
  Action,
  ActionStrategy,
  ActionType,
  Concept,
  Method,
  MethodCreator,
  UnifiedSubject,
  axiumConclude,
  createActionController$,
  createAsyncMethodWithState,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  selectUnifiedState,
  strategySuccess
} from 'stratimux';
// import { strategyData_appendFailure, strategyData_unifyData } from '../../../model/actionStrategy';
import fs from 'fs';
import path from 'path';
import { UserInterfaceServerState } from '../userInterfaceServer.concept';

export type CreateEachPageHtmlPayload = {
  targetDir: string
};
export const userInterfaceServerCreateEachPageHtmlType: ActionType = 'User Interface Server create each page\'s html file';
export const userInterfaceServerCreateEachPageHtml =
  prepareActionWithPayloadCreator<CreateEachPageHtmlPayload>(userInterfaceServerCreateEachPageHtmlType);

const createCreateEachPageHtmlMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createAsyncMethodWithState<UserInterfaceServerState>((controller, action, state) => {
    const payload = selectPayload<CreateEachPageHtmlPayload>(action);
    const pages = [];
    for (const page of state.pages) {
      if (page.title.toLocaleLowerCase().indexOf('error') !== -1) {
        pages.push({
          html: page.compositions.map(comp => comp.html).join(''),
          fileName: path.resolve(payload.targetDir + 404 + '.html')
        });
      } else {
        pages.push({
          html: page.compositions.map(comp => comp.html).join(''),
          fileName: path.resolve(payload.targetDir + page.title + '.html')
        });
      }
    }
    if (action.strategy) {
      for (const page of pages) {
        fs.writeFile(page.fileName, page.html, (err) => {
          console.log('CHECK', err);
          if (err) { throw err; }
        });
      }
      const newStrategy =
          strategySuccess(action.strategy as ActionStrategy);
      controller.fire(newStrategy);
    } else {
      controller.fire(axiumConclude());
    }
  }, concepts$ as UnifiedSubject, semaphore as number);

export const userInterfaceServerCreateEachPageHtmlQuality = createQuality(
  userInterfaceServerCreateEachPageHtmlType,
  defaultReducer,
  createCreateEachPageHtmlMethodCreator,
);