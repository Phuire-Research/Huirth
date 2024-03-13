/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will create recursively a html document for each page presented in the payload in the target directory.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  axiumConclude,
  createAsyncMethod,
  createQuality,
  nullReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyRecurse,
  strategySuccess
} from 'stratimux';
import fs from 'fs/promises';
import path from 'path';
import { Page } from '../../../model/userInterface';

export type RecursivelyCreateEachPageHtmlPayload = {
  targetDir: string,
  pages: Page[]
};
export const userInterfaceServerRecursivelyCreateEachPageHtmlType: ActionType =
  'User Interface Server recursively create each page\'s html file';
export const userInterfaceServerRecursivelyCreateEachPageHtml =
  prepareActionWithPayloadCreator<RecursivelyCreateEachPageHtmlPayload>(userInterfaceServerRecursivelyCreateEachPageHtmlType);

const createRecursivelyCreateEachPageHtmlMethodCreator: MethodCreator = () =>
  createAsyncMethod((controller, action) => {
    const payload = selectPayload<RecursivelyCreateEachPageHtmlPayload>(action);
    const targetPage = payload.pages.shift();
    if (targetPage) {
      let page;
      if (targetPage.title.toLocaleLowerCase().indexOf('error') !== -1) {
        page = {
          html: targetPage.compositions.map(comp => comp.html).join(''),
          fileName: path.resolve(payload.targetDir + 404 + '.html')
        };
      } else {
        page = {
          html: targetPage.compositions.map(comp => comp.html).join(''),
          fileName: path.resolve(payload.targetDir + targetPage.title + '.html')
        };
      }
      fs.writeFile(page.fileName, page.html).then(() => {
        if (action.strategy) {
          if (payload.pages.length > 0) {
            controller.fire(strategyRecurse(action.strategy, {
              payload,
            }));
          } else {
            controller.fire(strategySuccess(action.strategy));
          }
        } else {
          controller.fire(axiumConclude());
        }
      });
    } else if (action.strategy) {
      controller.fire(strategySuccess(action.strategy));
    } else {
      controller.fire(axiumConclude());
    }
  });

export const userInterfaceServerRecursivelyCreateEachPageHtmlQuality = createQuality(
  userInterfaceServerRecursivelyCreateEachPageHtmlType,
  nullReducer,
  createRecursivelyCreateEachPageHtmlMethodCreator,
);
/*#>*/