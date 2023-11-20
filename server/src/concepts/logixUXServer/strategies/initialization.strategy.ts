import { createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemGetDirectoriesAndFiles } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { logixUXServerReadFromDataTrainingDataFromDirectories } from '../qualities/readFromDataTrainingDataFromDirectory.quality';
import { logixUXServerSetDPOFromData } from '../qualities/setDPOFromData.quality';
import { logixUXServerIsDataDirectorySetUp } from '../qualities/isDataDirectorySetUp.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { dataDirectories } from '../logixUXServer.model';

const logixUXServerInitializationStrategyTopic = 'logixUX Server Initialization Strategy';
export const logixUXServerInitializationStrategy = (root: string) => {
  const dataDirectory = path.join(root + '/data/logixUX');
  const gitRepoDirectory = path.join(root + '/data/' + dataDirectories.gitRepo);
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  const stepFour = createActionNode(logixUXServerSetDPOFromData(), {
    successNode: null,
    failureNode: null
  });
  const stepThree = createActionNode(logixUXServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepFour,
    failureNode: null
  });
  const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory({path: gitRepoDirectory}), {
    successNode: stepThree,
    failureNode: null,
    agreement: 20000
  });
  const stepTwo = createActionNode(logixUXServerIsDataDirectorySetUp(), {
    successNode: stepThree,
    failureNode: stepCreateDirectory
  });
  const stepOne = createActionNode(fileSystemGetDirectoriesAndFiles({path: dataDirectory}), {
    successNode: stepTwo,
    failureNode: null,
  });
  return createStrategy({
    topic: logixUXServerInitializationStrategyTopic,
    initialNode: stepOne,
  });
};
