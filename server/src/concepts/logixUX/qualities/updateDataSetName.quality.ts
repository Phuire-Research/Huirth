/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that updates a DataSet's name by index and set by event target value.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { DataSetTypes, PhuirEProjects, ProjectStatus } from '../logixUX.model';

export type LogixUXUpdateDataSetNamePayload = {
  index: number,
}

export const [
  logixUXUpdateDataSetName,
  logixUXUpdateDataSetNameType,
  logixUXUpdateDataSetNameQuality
] = createQualitySetWithPayload<LogixUXUpdateDataSetNamePayload>({
  type: 'Create logixUX UpdateDataSetName',
  reducer: (state: LogixUXState, action: Action): LogixUXState => {
    const payload = selectPayload<LogixUXUpdateDataSetNamePayload>(action);
    const target = userInterface_selectInputTarget(action);
    const trainingData = [...state.trainingData];
    let {stratimuxStatus, logixUXStatus} = state;
    const {projectsStatuses} = state;
    const dataSet = trainingData[payload.index];
    if (dataSet && target) {
      if (dataSet.type === DataSetTypes.project) {
        const name = dataSet.name.toLowerCase();
        if (name === PhuirEProjects.stratimux) {
          stratimuxStatus = ProjectStatus.installed;
        } else if (name === PhuirEProjects.logixUX) {
          logixUXStatus = ProjectStatus.installed;
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
      logixUXStatus,
      projectsStatuses
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/