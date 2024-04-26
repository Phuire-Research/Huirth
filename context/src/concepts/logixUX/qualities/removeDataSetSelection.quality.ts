/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that remove a dataset and if it is a project, update the status to installed.
$>*/
/*<#*/
import { UnifiedSubject, createActionNode, createMethodWithState, createQualitySet, createStrategy, strategyBegin } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { DataSetTypes, NamedDataSet, PhuirEProjects, ProjectStatus, TrainingData } from '../logixUX.model';
import { logixUXSendTriggerDeleteDataSetsStrategy } from './sendTriggerDeleteDataSetsStrategy.quality';
import { userInterface_isClient } from '../../../model/userInterface';

const isNot = (dataSet: NamedDataSet, not: string[]) => {
  for (const n of not) {
    if (dataSet.name === n) {
      return false;
    }
  }
  return true;
};

export const [logixUXRemoveDataSetSelection, logixUXRemoveDataSetSelectionType, logixUXRemoveDataSetSelectionQuality] = createQualitySet({
  type: 'logixUX remove data set selection',
  reducer: (state: LogixUXState): LogixUXState => {
    const { trainingData, dataSetSelection } = state;
    let { projectsStatuses, stratimuxStatus, logixUXStatus } = state;
    const newDataSetSelection = [];
    const newTrainingData: TrainingData = [];
    const not = trainingData.filter((_, i) => dataSetSelection[i]).map((d) => d.name);
    const newStatuses = [];

    for (const data of trainingData) {
      if (isNot(data, not)) {
        newTrainingData.push(data);
        newDataSetSelection.push(false);
        for (const project of projectsStatuses) {
          if (project.name === data.name) {
            newStatuses.push(project);
          }
          break;
        }
      } else if (data.type === DataSetTypes.project) {
        if (data.name.toLowerCase() === PhuirEProjects.stratimux) {
          stratimuxStatus = ProjectStatus.installed;
        } else if (data.name.toLowerCase() === PhuirEProjects.logixUX) {
          logixUXStatus = ProjectStatus.installed;
        } else {
          for (const project of projectsStatuses) {
            if (project.name === data.name) {
              project.status = ProjectStatus.installed;
              newStatuses.push(project);
            }
          }
        }
      }
    }
    projectsStatuses = newStatuses;
    console.log('NEW DATA SET SELECTION', newDataSetSelection);
    return {
      ...state,
      trainingData: newTrainingData,
      stratimuxStatus,
      logixUXStatus,
      projectsStatuses,
      dataSetSelection: newDataSetSelection,
    };
  },
  methodCreator: (concepts$, semaphore) =>
    createMethodWithState<LogixUXState>(
      (action, state) => {
        const { trainingData, dataSetSelection } = state;
        const names = trainingData.filter((__, i) => dataSetSelection[i]).map((d) => d.name);
        return strategyBegin(
          createStrategy({
            topic: 'Send Trigger Delete Data Sets: ' + names.join(', '),
            initialNode: createActionNode(logixUXSendTriggerDeleteDataSetsStrategy({ names }), { successNode: null, failureNode: null }),
          })
        );
      },
      concepts$ as UnifiedSubject,
      semaphore as number
    ),
});
/*#>*/
