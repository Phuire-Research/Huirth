/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a ActionStrategy that will git pull a targeted repository and inform the client if the repository was updated.
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy } from 'stratimux';
import { logixUXServerSendUpdateProjectToInstalled } from './client/logixUXServerSendUpdateProjectToInstalled.helper';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { logixUXServerGitCloneRepoToDirectory } from '../qualities/gitCloneRepoToDirectory.quality';
import { logixUXServerGitPullRepository } from '../qualities/gitPullRepository.quality';

export const logixUXServerGitPullRepositoryTopic = 'logixUXServer git pull target repository';
export const logixUXServerGitPullRepositoryStrategy = (root: string, name:string) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  // Step 3 Update status to installed by name as payload
  // console.log('CLONING ', url, name);
  // const stepUpdateProjectToInstalled = createActionNode(logixUXServerSendUpdateProjectToUpdated(name), {
  //   successNode: null,
  //   failureNode: null
  // });
  // Step 2 Git clone into that directory by name
  const stepGitPull = createActionNode(logixUXServerGitPullRepository({
    path: dataPath
  }), {
    successNode: null,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
    agreement: 60000
  });
  // Step 1 Remove directory if exists based on name
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory({path: dataPath}), {
    successNode: stepGitPull,
    failureNode: null,
    agreement: 60000
  });
  return createStrategy({
    topic: logixUXServerGitPullRepositoryTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/