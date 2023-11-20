import { createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemGetDirectoriesAndFiles } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { logixUXServerReadFromDataTrainingDataFromDirectories } from '../qualities/readFromDataTrainingDataFromDirectory.quality';
import { logixUXServerSetDPOFromData } from '../qualities/setDPOFromData.quality';
import { logixUXServerIsDataDirectorySetUp } from '../qualities/isDataDirectorySetUp.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { dataDirectories } from '../logixUXServer.model';
import { logixUXServerSetRepositoriesFromData } from '../qualities/setRepositoriesFromData.quality';

const logixUXServerInitializationStrategyTopic = 'logixUX Server Initialization Strategy';
export const logixUXServerInitializationStrategy = (root: string) => {
  const dataDirectory = path.join(root + '/data/');
  const logixUXDirectory = path.join(root + '/data/logixUX');
  const gitRepoDirectory = path.join(root + '/data/' + dataDirectories.gitRepo);
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  const stepSetDPO_data = createActionNode(logixUXServerSetDPOFromData(), {
    successNode: null,
    failureNode: null
  });
  const stepReadTrainingDataFromData = createActionNode(logixUXServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepSetDPO_data,
    failureNode: null
  });
  const stepVerifyLogixUXData = createActionNode(fileSystemGetDirectoriesAndFiles({path: logixUXDirectory}), {
    successNode: stepReadTrainingDataFromData,
    failureNode: null,
  });
  const stepSetRepositoriesFromData = createActionNode(logixUXServerSetRepositoriesFromData(), {
    // No need to worry about setting status beyond installed here. In the next steps we will verify all currently installed data sources.
    successNode: stepVerifyLogixUXData,
    failureNode: null
  });
  const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory({path: gitRepoDirectory}), {
    successNode: stepVerifyLogixUXData,
    failureNode: null,
    agreement: 20000
  });
  const stepIsTheDataDirectorySetUp = createActionNode(logixUXServerIsDataDirectorySetUp(), {
    successNode: stepSetRepositoriesFromData,
    failureNode: stepCreateDirectory
  });
  const stepReadDataDirectory = createActionNode(fileSystemGetDirectoriesAndFiles({path: dataDirectory}), {
    successNode: stepIsTheDataDirectorySetUp,
    failureNode: null,
  });
  return createStrategy({
    topic: logixUXServerInitializationStrategyTopic,
    initialNode: stepReadDataDirectory,
  });
};
