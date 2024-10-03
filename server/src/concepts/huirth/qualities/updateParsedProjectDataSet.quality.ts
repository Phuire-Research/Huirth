/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will append the payload data set into state, replacing if it already exists.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { DataSetTypes, NamedDataSet, PhuirEProjects, ProjectStatus, TrainingData } from '../huirth.model';

export type huirthUpdateParsedProjectDataSetPayload = {
  dataSet: NamedDataSet;
};

export const huirthUpdateParsedProjectDataSet = createQualityCardWithPayload<huirthState, huirthUpdateParsedProjectDataSetPayload>({
  type: 'huirth update parsed project data set',
  reducer: (state, action) => {
    const { dataSet } = selectPayload<huirthUpdateParsedProjectDataSetPayload>(action);
    const { dataSetSelection, trainingData } = state;
    let { projectsStatuses, stratimuxStatus, huirthStatus } = state;
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
    // console.log('CHECK INCOMING NAME', dataSet.name);
    if (!added) {
      newTrainingData.push(dataSet);
      dataSetSelection.push(false);
    }
    if (dataSet.type === DataSetTypes.project) {
      if (dataSet.name.toLowerCase() === PhuirEProjects.stratimux) {
        stratimuxStatus = ProjectStatus.parsed;
      } else if (dataSet.name.toLowerCase() === PhuirEProjects.huirth) {
        huirthStatus = ProjectStatus.parsed;
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
      trainingData: newTrainingData,
      stratimuxStatus,
      huirthStatus,
      projectsStatuses,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
