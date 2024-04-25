/*<$
For the graph programming graph programming framework Stratimux and a Concept logixUX, generate a quality that updates a project's status via supplied payload and selected by included name property.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { PhuirEProjects, ProjectStatus } from '../logixUX.model';

export type LogixUXUpdateProjectStatusPayload = {
  name: string,
  status: ProjectStatus
}
export const [
  logixUXUpdateProjectStatus,
  logixUXUpdateProjectStatusType,
  logixUXUpdateProjectStatusQuality
] = createQualitySetWithPayload<LogixUXUpdateProjectStatusPayload>({
  type: 'logixUX Update Project Status',
  reducer: (state: LogixUXState, action: Action): LogixUXState => {
    const { name, status } = selectPayload<LogixUXUpdateProjectStatusPayload>(action);
    console.log('CHECK INCOMING STATUS', name, status);
    if (name.toLocaleLowerCase() === PhuirEProjects.stratimux) {
      return {
        ...state,
        stratimuxStatus: status
      };
    } else if (name.toLocaleLowerCase() === PhuirEProjects.logixUX) {
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
  },
  methodCreator: defaultMethodCreator
});
/*#>*/