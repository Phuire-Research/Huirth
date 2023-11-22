/*<$
For the framework Stratimux and a Concept logixUX, generate a quality that updates a project's status via supplied payload and selected by included name property.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { PhuirEProjects, ProjectStatus } from '../logixUX.model';

export type LogixUXUpdateProjectStatusPayload = {
  name: string,
  status: ProjectStatus
}
export const logixUXUpdateProjectStatusType: ActionType = 'logixUX Update Project Status';
export const logixUXUpdateProjectStatus =
  prepareActionWithPayloadCreator<LogixUXUpdateProjectStatusPayload>(logixUXUpdateProjectStatusType);

function logixUXUpdateProjectStatusReducer(state: LogixUXState, action: Action): LogixUXState {
  const { name, status } = selectPayload<LogixUXUpdateProjectStatusPayload>(action);
  if (name === PhuirEProjects.stratimux) {
    return {
      ...state,
      stratimuxStatus: status
    };
  } else if (name === PhuirEProjects.logixUX) {
    return {
      ...state,
      logixUXStatus: status
    };
  } else {
    const projectsStatuses = state.projectsStatuses;
    projectsStatuses.push({
      name,
      status,
    });
    return {
      ...state,
      projectsStatuses,
    };
  }
}

export const logixUXUpdateProjectStatusQuality = createQuality(
  logixUXUpdateProjectStatusType,
  logixUXUpdateProjectStatusReducer,
  defaultMethodCreator
);
/*#>*/