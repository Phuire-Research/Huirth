/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate an ActionStrategy that will set a target project status to the passed value of status.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { logixUXUpdateProjectStatus } from '../qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../logixUX.model';

export const logixUXUpdateProjectStatusStrategyTopic = 'logixUX set project status to the specified status';
export const logixUXUpdateProjectStatusStrategy = (name: string, status: ProjectStatus) => {
  const stepSendToServer = createActionNode(
    logixUXUpdateProjectStatus({
      name,
      status,
    }),
    {
      successNode: null,
      // TODO: If failed we can use open to load a window with the git install webpage
      failureNode: null,
    }
  );
  const stepUpdateToInstalling = createActionNode(logixUXUpdateProjectStatus({ name, status: ProjectStatus.installing }), {
    successNode: stepSendToServer,
    failureNode: null,
  });
  return createStrategy({
    topic: logixUXUpdateProjectStatusStrategyTopic,
    initialNode: stepUpdateToInstalling,
  });
};
/*#>*/
