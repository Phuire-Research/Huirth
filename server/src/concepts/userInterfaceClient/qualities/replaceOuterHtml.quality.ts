/*<$
For the graph programming framework Stratimux and the User Interface Client Concept, generate a quality that will replace the outer html of a document's element based on the incoming id.
$>*/
/*<#*/
import { createMethod, createQualityCardWithPayload, nullReducer, selectPayload, strategySuccess } from '@phuire/stratimux';
import { userInterface_selectPage } from '../../../model/userInterface';

export type UserInterfaceClientReplaceOuterHtmlPayload = {
  id: string;
};

export const userInterfaceClientReplaceOuterHtml =
  createQualityCardWithPayload<UserInterfaceClientReplaceOuterHtmlPayload, any>({
    type: 'User Interface Client assemble update atomic compositions strategy client',
    reducer: nullReducer,
    methodCreator: () =>
      createMethod((action) => {
        if (action.strategy) {
          const {payload} = action;
          const composition = userInterface_selectPage(action.strategy).compositions.filter((comp) => comp.id === payload.id)[0];
          const element = document.getElementById(composition.id);
          const checkActive = document.activeElement?.id;
          const start = (() => {
            const active = document.activeElement;
            if (active) {
              if ((active as HTMLInputElement).focus) {
                return (active as HTMLInputElement).selectionStart;
              }
            }
            return undefined;
          })();
          if (element) {
            element.outerHTML = composition.html;
          }
          if (checkActive && start !== undefined) {
            const activeElement = document.getElementById(checkActive);
            if (activeElement && document.activeElement?.id && document.activeElement.id !== checkActive && activeElement['focus']) {
              try {
                (activeElement as HTMLInputElement).selectionStart = start;
                activeElement.focus();
              } catch (err) {
                //
              }
            }
          }
          return strategySuccess(action.strategy);
        }
        return action;
      }),
  });
/*#>*/
