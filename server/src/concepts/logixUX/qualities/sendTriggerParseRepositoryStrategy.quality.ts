/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will Send the trigger action to the server that starts the parse repositories strategy on the server.
As well as inform the user that the data is currently being parsed.
$>*/
/*<#*/
import {
  Action,
  createAction,
  createActionNode,
  createMethodDebounce,
  createQualitySetWithPayload,
  createStrategy,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { PhuirEProjects, ProjectStatus } from '../logixUX.model';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';

export type LogixUXSendTriggerParseRepositoryStrategyPayload = {
  name: string,
}

export const [
  logixUXSendTriggerParseRepositoryStrategy,
  logixUXSendTriggerParseRepositoryStrategyType,
  logixUXSendTriggerParseRepositoryStrategyQuality
] = createQualitySetWithPayload<LogixUXSendTriggerParseRepositoryStrategyPayload>({
  type: 'logixUX send trigger parse repository to the server',
  reducer: (state: LogixUXState, action: Action): LogixUXState => {
    const { name } = selectPayload<LogixUXSendTriggerParseRepositoryStrategyPayload>(action);
    let { stratimuxStatus, logixUXStatus, projectsStatuses } = state;
    if (name.toLowerCase() === PhuirEProjects.stratimux) {
      stratimuxStatus = ProjectStatus.parsing;
    } else if (name.toLowerCase() === PhuirEProjects.logixUX) {
      logixUXStatus = ProjectStatus.parsing;
    } else {
      const newStatuses = [];
      let added = false;
      for (const status of projectsStatuses) {
        if (status.name === name) {
          status.status = ProjectStatus.parsing;
          newStatuses.push(status);
          added = true;
        } else {
          newStatuses.push(status);
        }
      }
      if (!added) {
        newStatuses.push({
          name: name,
          status: ProjectStatus.parsing
        });
      }
      projectsStatuses = newStatuses;
    }
    return {
      ...state,
      stratimuxStatus,
      logixUXStatus,
      projectsStatuses
    };
  },
  methodCreator: () =>
    createMethodDebounce(
      (action) => {
        const { name } = selectPayload<LogixUXSendTriggerParseRepositoryStrategyPayload>(action);
        const strategy = createStrategy({
          topic: `Sending to server trigger parse repository strategy for ${name}`,
          initialNode: createActionNode(userInterfaceClientSendActionToServer(createAction('logixUXServer trigger parse repository strategy', {
            name
          })), {
            successNode: null,
            failureNode: null
          })
        });
        return strategyBegin(strategy);
      }, 50
    )
});
/*#>*/