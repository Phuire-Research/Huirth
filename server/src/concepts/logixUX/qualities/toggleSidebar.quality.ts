/*<$*/
// PROMPT: For the framework Stratimux and a Concept logixUX, generate a quality that will toggle the sideBarExpanded property on the supplied state.
/*$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export const logixUXToggleSidebarType: ActionType = 'Create logixUX ToggleSidebar';
export const logixUXToggleSidebar =
  prepareActionCreator(logixUXToggleSidebarType);

function logixUXToggleSidebarReducer(state: LogixUXState, action: Action): LogixUXState {
  return {
    ...state,
    sideBarExpanded: !state.sideBarExpanded,
  };
}

export const logixUXToggleSidebarQuality = createQuality(
  logixUXToggleSidebarType,
  logixUXToggleSidebarReducer,
  defaultMethodCreator
);
/*#>*/