/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will Send the trigger action to the server that starts the parse repositories strategy on the server.
As well as inform the user that the data is currently being parsed.
$>*/
/*<#*/
import {
  Action,
  createAction,
  createActionNode,
  createMethodDebounce,
  createQualityCardWithPayload,
  createStrategy,
  selectPayload,
  strategyBegin,
} from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { PhuirEProjects, ProjectStatus } from '../huirth.model';
import { userInterfaceClientSendActionToServer } from '../../userInterfaceClient/strategies/sendActionToServer.helper';

export type huirthSendTriggerParseRepositoryStrategyPayload = {
  name: string;
};

export const [
  huirthSendTriggerParseRepositoryStrategy,
  huirthSendTriggerParseRepositoryStrategyType,
  huirthSendTriggerParseRepositoryStrategyQuality,
] = createQualityCardWithPayload<huirthSendTriggerParseRepositoryStrategyPayload>({
  type: 'huirth send trigger parse repository to the server',
  reducer: (state: huirthState, action: Action): huirthState => {
    const { name } = selectPayload<huirthSendTriggerParseRepositoryStrategyPayload>(action);
    let { stratimuxStatus, huirthStatus, projectsStatuses } = state;
    if (name.toLowerCase() === PhuirEProjects.stratimux) {
      stratimuxStatus = ProjectStatus.parsing;
    } else if (name.toLowerCase() === PhuirEProjects.huirth) {
      huirthStatus = ProjectStatus.parsing;
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
          status: ProjectStatus.parsing,
        });
      }
      projectsStatuses = newStatuses;
    }
    return {
      ...state,
      stratimuxStatus,
      huirthStatus,
      projectsStatuses,
    };
  },
  methodCreator: () =>
    createMethodDebounce((action) => {
      const { name } = selectPayload<huirthSendTriggerParseRepositoryStrategyPayload>(action);
      return strategyBegin(
        createStrategy({
          topic: `Sending to server trigger parse repository strategy for ${name}`,
          initialNode: createActionNode(
            userInterfaceClientSendActionToServer(
              createAction('huirthServer trigger parse repository strategy', {
                payload: {
                  name,
                },
              })
            )
          ),
        })
      );
    }, 50),
});
/*#>*/
