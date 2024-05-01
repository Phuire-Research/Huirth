/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will Send the trigger action to the server that starts the save data set selection strategy.
As well as inform the user what data sets are currently being saved.
$>*/
/*<#*/
import {
  Action,
  UnifiedSubject,
  createAction,
  createActionNode,
  createMethodDebounceWithState,
  createQualitySet,
  createStrategy,
  strategyBegin,
} from 'stratimux';
import { huirthState } from '../huirth.concept';
import { ProjectStatus } from '../huirth.model';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { huirthServerState } from '../../huirthServer/huirthServer.concept';
import { huirthClearDataSetSelection } from './clearDataSetSelection.quality';

export const [
  huirthSendTriggerSaveDataSetSelectionStrategy,
  huirthSendTriggerSaveDataSetSelectionStrategyType,
  huirthSendTriggerSaveDataSetSelectionStrategyQuality,
] = createQualitySet({
  type: 'huirth send trigger save data set selection strategy to server',
  reducer: (state: huirthState, _: Action): huirthState => {
    const { trainingData } = state;
    let { stratimuxStatus, huirthStatus, projectsStatuses } = state;
    const { dataSetSelection } = state;
    const names: string[] = [];
    for (const [i, select] of dataSetSelection.entries()) {
      if (select) {
        const name = trainingData[i].name;
        names.push(name);
        if (name.toLowerCase() === 'stratimux') {
          stratimuxStatus = ProjectStatus.saving;
        } else if (name.toLowerCase() === 'huirth') {
          huirthStatus = ProjectStatus.saving;
        } else {
          const newStatuses = [];
          let added = false;
          for (const status of projectsStatuses) {
            if (status.name === name) {
              status.status = ProjectStatus.saving;
              newStatuses.push(status);
              added = true;
            } else {
              newStatuses.push(status);
            }
          }
          if (!added) {
            newStatuses.push({
              name: name,
              status: ProjectStatus.saving,
            });
          }
          projectsStatuses = newStatuses;
        }
      }
    }
    return {
      ...state,
      stratimuxStatus,
      huirthStatus,
      projectsStatuses,
    };
  },
  methodCreator: (concepts$, semaphore) =>
    createMethodDebounceWithState<huirthServerState>(
      (_, state) => {
        const { dataSetSelection, trainingData } = state;
        const names: string[] = [];
        for (const [i, select] of dataSetSelection.entries()) {
          if (select) {
            const name = trainingData[i].name;
            names.push(name);
          }
        }
        const strategy = createStrategy({
          topic: `Sending to server trigger save data set selection for: ${names.join(', ')}`,
          initialNode: createActionNode(
            userInterfaceClientSendActionToServer(
              createAction('huirthServer trigger save data set selection strategy', {
                names,
              })
            ),
            {
              successNode: createActionNode(huirthClearDataSetSelection()),
            }
          ),
        });
        return strategyBegin(strategy);
      },
      concepts$ as UnifiedSubject,
      semaphore as number,
      50
    ),
});
/*#>*/
