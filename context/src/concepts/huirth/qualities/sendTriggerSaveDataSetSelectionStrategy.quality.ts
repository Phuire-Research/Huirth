/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will Send the trigger action to the server that starts the save data set selection strategy.
As well as inform the user what data sets are currently being saved.
$>*/
/*<#*/
import {
  Action,
  createAction,
  createActionNode,
  createMethodDebounceWithState,
  createQualityCard,
  createStrategy,
  strategyBegin,
} from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { ProjectStatus } from '../huirth.model';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { huirthServerState } from '../../huirthServer/huirthServer.concept';
import { huirthClearDataSetSelection } from './clearDataSetSelection.quality';

export const huirthSendTriggerSaveDataSetSelectionStrategy = createQualityCard<huirthState>({
  type: 'huirth send trigger save data set selection strategy to server',
  reducer: (state) => {
    const { trainingData } = state;
    let { stratimuxStatus, huirthStatus, projectsStatuses } = state;
    const { dataSetSelection } = state;
    const names: string[] = [];
    for (const [i, select] of dataSetSelection.entries()) {
      if (select) {
        const name = trainingData[i].name;
        names.push(name);
        if (name.toLowerCase() === '@phuire/stratimux') {
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
      stratimuxStatus,
      huirthStatus,
      projectsStatuses,
    };
  },
  methodCreator: () =>
    createMethodDebounceWithState<huirthServerState>(({ state }) => {
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
              payload: {
                names,
              },
            })
          ),
          {
            successNode: createActionNode(huirthClearDataSetSelection.actionCreator()),
          }
        ),
      });
      return strategyBegin(strategy);
    }, 50),
});
/*#>*/
