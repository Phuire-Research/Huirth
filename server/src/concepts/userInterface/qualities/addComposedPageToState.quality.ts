import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { userInterface_selectPage } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export const userInterfaceAddComposedPageToStateType: ActionType =
  'User Interface add composed Page to State';
export const userInterfaceAddComposedPageToState = prepareActionCreator(userInterfaceAddComposedPageToStateType);

function addComposedPageToState(state: UserInterfaceState, action: Action): UserInterfaceState {
  if (action.strategy) {
    const page = userInterface_selectPage(action.strategy);
    const newPages = state.pages.filter(_page => {
      return page.title !== _page.title;
    });
    newPages.push(page);
    return {
      ...state,
      pages: newPages
    };
  }
  return {
    ...state,
  };
}

export const userInterfaceAddComposedPageToStateQuality = createQuality(
  userInterfaceAddComposedPageToStateType,
  addComposedPageToState,
  defaultMethodCreator,
);
