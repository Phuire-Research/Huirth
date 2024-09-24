/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that remove a dataset and if it is a project, update the status to installed.
$>*/
/*<#*/
import { createActionNode, createMethodWithState, createQualityCard, createStrategy, strategyBegin } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { DataSetTypes, NamedDataSet, PhuirEProjects, ProjectStatus, TrainingData } from '../huirth.model';
import { huirthSendTriggerDeleteDataSetsStrategy } from './sendTriggerDeleteDataSetsStrategy.quality';

const isNot = (dataSet: NamedDataSet, not: string[]) => {
  for (const n of not) {
    if (dataSet.name === n) {
      return false;
    }
  }
  return true;
};

export const huirthRemoveDataSetSelection = createQualityCard<huirthState>({
  type: 'huirth remove data set selection',
  reducer: (state) => {
    const { trainingData, dataSetSelection } = state;
    let { projectsStatuses, stratimuxStatus, huirthStatus } = state;
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
        } else if (data.name.toLowerCase() === PhuirEProjects.huirth) {
          huirthStatus = ProjectStatus.installed;
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
      huirthStatus,
      projectsStatuses,
      dataSetSelection: newDataSetSelection,
    };
  },
  methodCreator: () =>
    createMethodWithState<huirthState>(
      (_, state) => {
        const { trainingData, dataSetSelection } = state;
        const names = trainingData.filter((__, i) => dataSetSelection[i]).map((d) => d.name);
        return strategyBegin(
          createStrategy({
            topic: 'Send Trigger Delete Data Sets: ' + names.join(', '),
            initialNode: createActionNode(huirthSendTriggerDeleteDataSetsStrategy.actionCreator({ names }), { successNode: null, failureNode: null }),
          })
        );
      },
    ),
});
/*#>*/
