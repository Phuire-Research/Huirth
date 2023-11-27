/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will update a project's status to saved.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { ProjectStatus, TrainingData } from '../logixUX.model';

export type LogixUXUpdateProjectStatusToSavedPayload = {
  name: string;
};
export const logixUXUpdateProjectStatusToSavedType: ActionType = 'logixUX update project status to saved';
export const logixUXUpdateProjectStatusToSaved = prepareActionWithPayloadCreator<LogixUXUpdateProjectStatusToSavedPayload>(
  logixUXUpdateProjectStatusToSavedType
);

function logixUXUpdateProjectStatusToSavedReducer(state: LogixUXState, action: Action): LogixUXState {
  const { name } = selectPayload<LogixUXUpdateProjectStatusToSavedPayload>(action);
  let { projectsStatuses, stratimuxStatus, logixUXStatus } = state;
  let added = false;
  if (name.toLowerCase() === 'stratimux') {
    stratimuxStatus = ProjectStatus.saved;
  } else if (name.toLowerCase() === 'logixux') {
    logixUXStatus = ProjectStatus.saved;
  } else {
    added = false;
    const newStatuses = [];
    for (const status of projectsStatuses) {
      if (status.name === name) {
        status.status = ProjectStatus.saved;
        newStatuses.push(status);
        added = true;
      } else {
        newStatuses.push(status);
      }
    }
    if (!added) {
      newStatuses.push({
        name: name,
        status: ProjectStatus.saved,
      });
    }
    projectsStatuses = newStatuses;
  }
  return {
    ...state,
    stratimuxStatus,
    logixUXStatus,
    projectsStatuses,
  };
}

export const logixUXUpdateProjectStatusToSavedQuality = createQuality(
  logixUXUpdateProjectStatusToSavedType,
  logixUXUpdateProjectStatusToSavedReducer,
  defaultMethodCreator
);
/*#>*/
