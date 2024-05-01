/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's name by index and set by event target value.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { DataSetTypes, PhuirEProjects, ProjectStatus } from '../huirth.model';

export type huirthUpdateDataSetNamePayload = {
  index: number,
}

export const [
  huirthUpdateDataSetName,
  huirthUpdateDataSetNameType,
  huirthUpdateDataSetNameQuality
] = createQualitySetWithPayload<huirthUpdateDataSetNamePayload>({
  type: 'Create huirth UpdateDataSetName',
  reducer: (state: huirthState, action: Action): huirthState => {
    const payload = selectPayload<huirthUpdateDataSetNamePayload>(action);
    const target = userInterface_selectInputTarget(action);
    const trainingData = [...state.trainingData];
    let {stratimuxStatus, huirthStatus} = state;
    const {projectsStatuses} = state;
    const dataSet = trainingData[payload.index];
    if (dataSet && target) {
      if (dataSet.type === DataSetTypes.project) {
        const name = dataSet.name.toLowerCase();
        if (name === PhuirEProjects.stratimux) {
          stratimuxStatus = ProjectStatus.installed;
        } else if (name === PhuirEProjects.huirth) {
          huirthStatus = ProjectStatus.installed;
        } else {
          for (const project of projectsStatuses) {
            if (project.name.toLowerCase() === name) {
              project.status = ProjectStatus.installed;
            }
          }
        }
      }
      dataSet.name = target.value;
    }
    return {
      ...state,
      trainingData,
      stratimuxStatus,
      huirthStatus,
      projectsStatuses
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/