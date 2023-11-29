/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that remove a dataset and if it is a project, update the status to installed.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createActionNode,
  createMethodWithState,
  createQuality,
  createStrategy,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { DataSetTypes, NamedDataSet, ProjectStatus, TrainingData } from '../logixUX.model';
import { logixUXSendTriggerDeleteDataSetsStrategy } from './sendTriggerSaveDeleteDataSetsStrategy.quality';

export const logixUXRemoveDataSetSelectionType: ActionType = 'logixUX remove data set selection';
export const logixUXRemoveDataSetSelection =
  prepareActionCreator(logixUXRemoveDataSetSelectionType);

const projectIs = (status: ProjectStatus): boolean => {
  switch (status) {
  case ProjectStatus.parsed: {
    return true;
  }
  default: {
    return false;
  }
  }
};

const isNot = (dataSet: NamedDataSet, not: string[]) => {
  for (const n of not) {
    if (dataSet.name === n) {
      return false;
    }
  }
  return true;
};

const logixUXRemoveDataSetSelectionMethodCreator: MethodCreator = (concepts$, semaphore) => createMethodWithState<LogixUXState>((_, state) => {
  const {trainingData, dataSetSelection} = state;
  const names = trainingData.filter((__, i) => dataSetSelection[i]).map(d => d.name);
  return strategyBegin(createStrategy({
    topic: 'Send Trigger Delete Data Sets: ' + names.join(', '),
    initialNode: createActionNode(logixUXSendTriggerDeleteDataSetsStrategy({names}), {successNode: null, failureNode: null})
  }));
}, concepts$ as UnifiedSubject, semaphore as number);

function logixUXRemoveDataSetSelectionReducer(state: LogixUXState, action: Action): LogixUXState {
  const {trainingData, dataSetSelection} = state;
  let {projectsStatuses, stratimuxStatus, logixUXStatus} = state;
  const newTrainingData: TrainingData = [];
  const not = trainingData.filter((_, i) => dataSetSelection[i]).map(d => d.name);
  const newStatuses = [];

  for (const data of trainingData) {
    if (isNot(data, not)) {
      newTrainingData.push(data);
      for (const project of projectsStatuses) {
        if (project.name === data.name) {
          newStatuses.push(project);
        }
        break;
      }
    } else if (data.type === DataSetTypes.project) {
      if (data.name.toLowerCase() === 'stratimux' && projectIs(stratimuxStatus)) {
        stratimuxStatus = ProjectStatus.installed;
      } else if (data.name.toLowerCase() === 'logixux' && projectIs(logixUXStatus)) {
        logixUXStatus = ProjectStatus.installed;
      } else {
        for (const project of projectsStatuses) {
          if (project.name === data.name && projectIs(project.status)) {
            project.status = ProjectStatus.installed;
            newStatuses.push(project);
          } else {
            newStatuses.push(project);
          }
        }
      }
    }
  }
  projectsStatuses = newStatuses;

  return {
    ...state,
    trainingData: newTrainingData,
    stratimuxStatus,
    logixUXStatus,
    projectsStatuses,
  };
}

export const logixUXRemoveDataSetSelectionQuality = createQuality(
  logixUXRemoveDataSetSelectionType,
  logixUXRemoveDataSetSelectionReducer,
  logixUXRemoveDataSetSelectionMethodCreator
);
/*#>*/