/*<$
For the framework Stratimux and a Concept logixUX, generate a quality that will Send the trigger action to the server that starts the save data set selection strategy.
As well as inform the user what data sets are currently being saved.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createAction,
  createActionNode,
  createMethodDebounceWithState,
  createQuality,
  createStrategy,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { ProjectStatus } from '../logixUX.model';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';
import { LogixUXServerState } from '../../logixUXServer/logixUXServer.concept';

export const logixUXSendTriggerSaveDataSetSelectionStrategyType: ActionType = 'logixUX send trigger save data set selection strategy to server';
export const logixUXSendTriggerSaveDataSetSelectionStrategy =
  prepareActionCreator(logixUXSendTriggerSaveDataSetSelectionStrategyType);

const logixUXSendTriggerSaveDataSetSelectionStrategyMethodCreator: MethodCreator = (concepts$, semaphore) =>
  createMethodDebounceWithState<LogixUXServerState>(
    (_, state) => {
      const {dataSetSelection, trainingData} = state;
      const names: string[] = [];
      for (const [i, select] of dataSetSelection.entries()) {
        if (select) {
          const name = trainingData[i].name;
          names.push(name);
        }
      }
      const strategy = createStrategy({
        topic: `Sending to server trigger save data set selection for: ${names.join(', ')}`,
        initialNode: createActionNode(userInterfaceClientSendActionToServer(createAction('logixUXServer trigger save data set selection strategy', {
          names
        })), {
          successNode: null,
          failureNode: null
        })
      });
      return strategyBegin(strategy);
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

const logixUXSendTriggerSaveDataSetSelectionStrategyReducer = (state: LogixUXState, _: Action): LogixUXState => {
  const {dataSetSelection, trainingData} = state;
  let { stratimuxStatus, logixUXStatus, projectsStatuses, } = state;
  const names: string[] = [];
  for (const [i, select] of dataSetSelection.entries()) {
    if (select) {
      const name = trainingData[i].name;
      names.push(name);
      if (name.toLowerCase() === 'stratimux') {
        stratimuxStatus = ProjectStatus.parsing;
      } else if (name.toLowerCase() === 'logixux') {
        logixUXStatus = ProjectStatus.saving;
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
            status: ProjectStatus.saving
          });
        }
        projectsStatuses = newStatuses;
      }
    }
  }
  return {
    ...state,
    stratimuxStatus,
    logixUXStatus,
    projectsStatuses
  };
};

export const logixUXSendTriggerSaveDataSetSelectionStrategyQuality = createQuality(
  logixUXSendTriggerSaveDataSetSelectionStrategyType,
  logixUXSendTriggerSaveDataSetSelectionStrategyReducer,
  logixUXSendTriggerSaveDataSetSelectionStrategyMethodCreator,
);
/*#>*/