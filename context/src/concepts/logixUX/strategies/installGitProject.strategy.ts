/*<$
For the framework Stratimux and a Concept logixUX, generate an ActionStrategy that will set a target project status to installing then utilize the client helper function to trigger the git clone strategy on the server.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { logixUXUpdateProjectStatus } from '../qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../logixUX.model';
import { logixUXTriggerCloneGitRepositoryStrategy } from './server/triggerCloneGitRepositoryStrategy.helper';

export const logixUXInstallGitRepositoryTopic = 'logixUX set project status to installing then trigger git clone strategy on server';
export const logixUXInstallGitRepositoryStrategy = (url: string, name: string) => {
  const stepSendToServer = createActionNode(logixUXTriggerCloneGitRepositoryStrategy(url, name), {
    successNode: null,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
  });
  const stepUpdateToInstalling = createActionNode(logixUXUpdateProjectStatus({ name, status: ProjectStatus.installing }), {
    successNode: stepSendToServer,
    failureNode: null,
  });
  return createStrategy({
    topic: logixUXInstallGitRepositoryTopic,
    initialNode: stepUpdateToInstalling,
  });
};
/*#>*/
