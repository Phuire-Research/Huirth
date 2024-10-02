/*<$
For the graph programming graph programming framework Stratimux and a Concept huirth, generate a quality that updates a project's status via supplied payload and selected by included name property.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { PhuirEProjects, ProjectStatus } from '../huirth.model';

export type huirthUpdateProjectStatusPayload = {
  name: string;
  status: ProjectStatus;
};
export const huirthUpdateProjectStatus = createQualityCardWithPayload<huirthState, huirthUpdateProjectStatusPayload>({
  type: 'huirth Update Project Status',
  reducer: (state, action) => {
    const { name, status } = action.payload;
    console.log('CHECK INCOMING STATUS', name, status);
    if (name.toLocaleLowerCase() === PhuirEProjects.stratimux) {
      return {
        stratimuxStatus: status,
      };
    } else if (name.toLocaleLowerCase() === PhuirEProjects.huirth) {
      return {
        huirthStatus: status,
      };
    } else {
      const projectsStatuses = state.projectsStatuses;
      projectsStatuses.push({
        name,
        status,
      });
      return {
        projectsStatuses,
      };
    }
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
