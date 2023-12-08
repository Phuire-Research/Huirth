/*<$
For the graph programming framework Stratimux and the User Interface Client Concept, generate a quality that will replace the outer html of a document's element based on the incoming id.
$>*/
/*<#*/
import {
  ActionType,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess,
} from 'stratimux';
import { userInterface_selectPage } from '../../../model/userInterface';

export type UserInterfaceClientReplaceOuterHtmlPayload = {
  id: string;
};
export const userInterfaceClientReplaceOuterHtmlType: ActionType =
  'User Interface Client assemble update atomic compositions strategy client';
export const userInterfaceClientReplaceOuterHtml = prepareActionWithPayloadCreator(userInterfaceClientReplaceOuterHtmlType);

const createUserInterfaceClientReplaceOuterHtmlMethod = () =>
  createMethod((action) => {
    if (action.strategy) {
      const payload = selectPayload<UserInterfaceClientReplaceOuterHtmlPayload>(action);
      const composition = userInterface_selectPage(action.strategy).compositions.filter((comp) => comp.id === payload.id)[0];
      const element = document.getElementById(composition.id);
      if (element) {
        element.outerHTML = composition.html;
      }
      return strategySuccess(action.strategy);
    }
    return action;
  });

export const userInterfaceClientReplaceOuterHtmlQuality = createQuality(
  userInterfaceClientReplaceOuterHtmlType,
  defaultReducer,
  createUserInterfaceClientReplaceOuterHtmlMethod
);
/*#>*/
