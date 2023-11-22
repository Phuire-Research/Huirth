/*<$
For the framework Stratimux and a Concept logixUX, generate a quality that will append the payload data set into state, replacing if it already exists.
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
import { NamedDataSet, ProjectStatus, TrainingData } from '../logixUX.model';

export type LogixUXUpdateParsedProjectDataSetPayload = {
  dataSet: NamedDataSet,
}
export const logixUXUpdateParsedProjectDataSetType: ActionType = 'logixUX update parsed project data set';
export const logixUXUpdateParsedProjectDataSet =
  prepareActionWithPayloadCreator<LogixUXUpdateParsedProjectDataSetPayload>(logixUXUpdateParsedProjectDataSetType);

function logixUXUpdateParsedProjectDataSetReducer(state: LogixUXState, action: Action): LogixUXState {
  const {dataSet} = selectPayload<LogixUXUpdateParsedProjectDataSetPayload>(action);
  let {projectsStatuses, stratimuxStatus, logixUXStatus} = state;
  const trainingData: TrainingData = [];
  let added = false;
  for (const data of trainingData) {
    if (data.name === dataSet.name) {
      trainingData.push(dataSet);
      added = true;
    } else if (data.name !== dataSet.name) {
      trainingData.push(dataSet);
    }
  }
  if (!added) {
    trainingData.push(dataSet);
  }
  if (dataSet.name.toLowerCase() === 'stratimux') {
    stratimuxStatus = ProjectStatus.parsed;
  } else if (dataSet.name.toLowerCase() === 'logixux') {
    logixUXStatus = ProjectStatus.parsed;
  } else {
    added = false;
    const newStatuses = [];
    for (const status of projectsStatuses) {
      if (status.name === dataSet.name) {
        status.status = ProjectStatus.parsed;
        newStatuses.push(status);
        added = true;
      } else {
        newStatuses.push(status);
      }
    }
    if (!added) {
      newStatuses.push({
        name: dataSet.name,
        status: ProjectStatus.parsed
      });
    }
    projectsStatuses = newStatuses;
  }
  return {
    ...state,
    trainingData,
    stratimuxStatus,
    logixUXStatus,
    projectsStatuses
  };
}

export const logixUXUpdateParsedProjectDataSetQuality = createQuality(
  logixUXUpdateParsedProjectDataSetType,
  logixUXUpdateParsedProjectDataSetReducer,
  defaultMethodCreator
);
/*#>*/