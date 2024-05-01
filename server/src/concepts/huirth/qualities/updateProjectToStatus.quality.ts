/*<$
For the graph programming graph programming framework Stratimux and a Concept huirth, generate a quality that updates a project's status via supplied payload and selected by included name property.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { huirthState } from '../huirth.concept';
import { PhuirEProjects, ProjectStatus } from '../huirth.model';

export type huirthUpdateProjectStatusPayload = {
  name: string,
  status: ProjectStatus
}
export const [
  huirthUpdateProjectStatus,
  huirthUpdateProjectStatusType,
  huirthUpdateProjectStatusQuality
] = createQualitySetWithPayload<huirthUpdateProjectStatusPayload>({
  type: 'huirth Update Project Status',
  reducer: (state: huirthState, action: Action): huirthState => {
    const { name, status } = selectPayload<huirthUpdateProjectStatusPayload>(action);
    console.log('CHECK INCOMING STATUS', name, status);
    if (name.toLocaleLowerCase() === PhuirEProjects.stratimux) {
      return {
        ...state,
        stratimuxStatus: status
      };
    } else if (name.toLocaleLowerCase() === PhuirEProjects.huirth) {
      return {
        ...state,
        huirthStatus: status
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