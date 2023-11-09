import { ActionType, createMethod, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';
import { userInterface_selectPage } from '../../../model/userInterface';

export const userInterfaceClientReplaceOuterHtmlType: ActionType =
  'User Interface Client assemble update atomic compositions strategy client';
export const userInterfaceClientReplaceOuterHtml = prepareActionCreator(userInterfaceClientReplaceOuterHtmlType);

const createUserInterfaceClientReplaceOuterHtmlMethod = () =>
  createMethod((action) => {
    if (action.strategy) {
      const composition = userInterface_selectPage(action.strategy).compositions[0];
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
