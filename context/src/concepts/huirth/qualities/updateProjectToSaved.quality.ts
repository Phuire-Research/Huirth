/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will update a project's status to saved.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { PhuirEProjects, ProjectStatus, TrainingData } from '../huirth.model';

export type huirthUpdateProjectStatusToSavedPayload = {
  name: string;
};

export const huirthUpdateProjectStatusToSaved = createQualityCardWithPayload<huirthState, huirthUpdateProjectStatusToSavedPayload>({
  type: 'huirth update project status to saved',
  reducer: (state, action) => {
    const { name } = action.payload;
    let { projectsStatuses, stratimuxStatus, huirthStatus } = state;
    console.log('HIT UPDATED SAVED STATUS!!', name);
    let added = false;
    if (name.toLowerCase() === PhuirEProjects.stratimux) {
      stratimuxStatus = ProjectStatus.saved;
    } else if (name.toLowerCase() === PhuirEProjects.huirth) {
      huirthStatus = ProjectStatus.saved;
    } else {
      added = false;
      const newStatuses = [];
      for (const status of projectsStatuses) {
        if (status.name === name) {
          status.status = ProjectStatus.saved;
          newStatuses.push(status);
          added = true;
        } else {
          newStatuses.push(status);
        }
      }
      if (!added) {
        newStatuses.push({
          name: name,
          status: ProjectStatus.saved,
        });
      }
      projectsStatuses = newStatuses;
    }
    return {
      stratimuxStatus,
      huirthStatus,
      projectsStatuses,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
