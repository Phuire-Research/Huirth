/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will append the payload data set into state, replacing if it already exists.
$>*/
/*<#*/
import { Action, ActionType, createQuality, defaultMethodCreator, prepareActionWithPayloadCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { DataSetTypes, NamedDataSet, ProjectStatus, TrainingData } from '../logixUX.model';

export type LogixUXUpdateParsedProjectDataSetPayload = {
  dataSet: NamedDataSet;
};
export const logixUXUpdateParsedProjectDataSetType: ActionType = 'logixUX update parsed project data set';
export const logixUXUpdateParsedProjectDataSet = prepareActionWithPayloadCreator<LogixUXUpdateParsedProjectDataSetPayload>(
  logixUXUpdateParsedProjectDataSetType
);

function logixUXUpdateParsedProjectDataSetReducer(state: LogixUXState, action: Action): LogixUXState {
  const { dataSet } = selectPayload<LogixUXUpdateParsedProjectDataSetPayload>(action);
  const { dataSetSelection, trainingData } = state;
  let { projectsStatuses, stratimuxStatus, logixUXStatus } = state;
  const newTrainingData: TrainingData = [];
  let added = false;
  for (const data of trainingData) {
    if (data.name === dataSet.name) {
      newTrainingData.push(dataSet);
      added = true;
    } else if (data.name !== dataSet.name) {
      newTrainingData.push(data);
    }
  }
  if (!added) {
    newTrainingData.push(dataSet);
    dataSetSelection.push(false);
  }
  if (dataSet.type === DataSetTypes.project) {
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
          status: ProjectStatus.parsed,
        });
      }
      projectsStatuses = newStatuses;
    }
  }
  return {
    ...state,
    trainingData: newTrainingData,
    stratimuxStatus,
    logixUXStatus,
    projectsStatuses,
  };
}

export const logixUXUpdateParsedProjectDataSetQuality = createQuality(
  logixUXUpdateParsedProjectDataSetType,
  logixUXUpdateParsedProjectDataSetReducer,
  defaultMethodCreator
);
/*#>*/
