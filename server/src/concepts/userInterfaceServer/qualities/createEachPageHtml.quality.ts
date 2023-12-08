/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will create a html document for each currently loaded page in the target directory.
$>*/
/*<#*/
import {
  ActionStrategy,
  ActionType,
  MethodCreator,
  UnifiedSubject,
  axiumConclude,
  createAsyncMethodWithState,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess
} from 'stratimux';
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
          html: page.compositions.map(comp => {
            if (comp.universal) {
              return state.components[comp.componentSemaphore as number].html;
            }
            return comp.html;
          }).join(''),
          fileName: path.resolve(payload.targetDir + 404 + '.html')
        });
      } else {
        pages.push({
          html: page.compositions.map(comp => {
            if (comp.universal) {
              return state.components[comp.componentSemaphore as number].html;
            }
            return comp.html;
          }).join(''),
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
/*#>*/