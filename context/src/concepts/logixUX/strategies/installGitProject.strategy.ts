import { createActionNode, createStrategy } from 'stratimux';
import { logixUXUpdateProjectStatus } from '../qualities/updateProjectToStatus.quality';
import { ProjectStatus } from '../logixUX.model';
import { logixUXTriggerCloneGitRepositoryStrategy } from './server/triggerCloneGitRepositoryStrategy.helper';

export const logixUXInstallGitRepositoryTopic = 'logixUX set project status to installing then trigger git clone strategy on server';
export const logixUXInstallGitRepositoryStrategy = (url: string, name:string) => {
  const stepSendToServer = createActionNode(logixUXTriggerCloneGitRepositoryStrategy(url, name), {
    successNode: null,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
  });
  // Step 1 Remove directory if exists based on name
  const stepUpdateToInstalling = createActionNode(logixUXUpdateProjectStatus({name, status: ProjectStatus.installing}), {
    // successNode: stepCreateDirectory,
    successNode: stepSendToServer,
    failureNode: null,
  });
  return createStrategy({
    topic: logixUXInstallGitRepositoryTopic,
    initialNode: stepUpdateToInstalling,
  });
};