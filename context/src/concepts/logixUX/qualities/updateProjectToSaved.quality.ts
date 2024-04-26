/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will update a project's status to saved.
$>*/
/*<#*/
import { Action, createQualitySetWithPayload, defaultMethodCreator, selectPayload } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { PhuirEProjects, ProjectStatus, TrainingData } from '../logixUX.model';

export type LogixUXUpdateProjectStatusToSavedPayload = {
  name: string;
};

export const [logixUXUpdateProjectStatusToSaved, logixUXUpdateProjectStatusToSavedType, logixUXUpdateProjectStatusToSavedQuality] =
  createQualitySetWithPayload<LogixUXUpdateProjectStatusToSavedPayload>({
    type: 'logixUX update project status to saved',
    reducer: (state: LogixUXState, action: Action): LogixUXState => {
      const { name } = selectPayload<LogixUXUpdateProjectStatusToSavedPayload>(action);
      let { projectsStatuses, stratimuxStatus, logixUXStatus } = state;
      console.log('HIT UPDATED SAVED STATUS!!', name);
      let added = false;
      if (name.toLowerCase() === PhuirEProjects.stratimux) {
        stratimuxStatus = ProjectStatus.saved;
      } else if (name.toLowerCase() === PhuirEProjects.logixUX) {
        logixUXStatus = ProjectStatus.saved;
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
        ...state,
        stratimuxStatus,
        logixUXStatus,
        projectsStatuses,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
