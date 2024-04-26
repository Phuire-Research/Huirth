/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a ActionStrategy that will set up the data directory as needed, otherwise will record its contents to the state.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemGetDirectoriesAndFiles } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { logixUXServerReadFromDataTrainingDataFromDirectories } from '../qualities/readFromDataTrainingDataFromDirectory.quality';
import { logixUXServerSetDPOFromData } from '../qualities/setDPOFromData.quality';
import { logixUXServerIsDataDirectorySetUp } from '../qualities/isDataDirectorySetUp.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { dataDirectories } from '../logixUXServer.model';
import { logixUXServerSetRepositoriesFromData } from '../qualities/setRepositoriesFromData.quality';
import { logixUXServerSetTrainingDataFromData } from '../qualities/setTrainingDataFromData.quality';

const logixUXServerInitializationStrategyTopic = 'logixUX Server Initialization Strategy';
export const logixUXServerInitializationStrategy = (root: string) => {
  const dataDirectory = path.join(root + '/data/');
  const dataSetsDirectory = path.join(root + '/data/sets/');
  const DPODirectory = path.join(root + '/data/logixUX');
  const gitRepoDirectory = path.join(root + '/data/' + dataDirectories.gitRepo + '/');
  const gitSetsDirectory = path.join(root + '/data/' + dataDirectories.sets + '/');
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  const stepSetTrainingDataFromData = createActionNode(logixUXServerSetTrainingDataFromData());
  const stepReadTrainingDataFromData = createActionNode(logixUXServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepSetTrainingDataFromData,
  });
  const stepVerifyDataSets = createActionNode(fileSystemGetDirectoriesAndFiles({path: dataSetsDirectory}), {
    successNode: stepReadTrainingDataFromData,
  });
  const stepSetDPO_data = createActionNode(logixUXServerSetDPOFromData(), {
    successNode: stepVerifyDataSets,
  });
  const stepReadDPOFromData = createActionNode(logixUXServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepSetDPO_data,
  });
  const stepVerifyDPOData = createActionNode(fileSystemGetDirectoriesAndFiles({path: DPODirectory}), {
    successNode: stepReadDPOFromData,
  });
  const stepSetRepositoriesFromData = createActionNode(logixUXServerSetRepositoriesFromData(), {
    // No need to worry about setting status beyond installed here. In the next steps we will verify all currently installed data sources.
    successNode: stepVerifyDPOData,
  });
  const stepReadDataRepoDirectory = createActionNode(fileSystemGetDirectoriesAndFiles({path: gitRepoDirectory}), {
    successNode: stepSetRepositoriesFromData,
  });
  const stepCreateSetsDirectory = createActionNode(fileSystemCreateTargetDirectory({path: gitSetsDirectory}), {
    successNode: stepVerifyDPOData,
    agreement: 20000
  });
  const stepCreateRepoDirectory = createActionNode(fileSystemCreateTargetDirectory({path: gitRepoDirectory}), {
    successNode: stepCreateSetsDirectory,
    agreement: 20000
  });
  const stepIsTheDataDirectorySetUp = createActionNode(logixUXServerIsDataDirectorySetUp(), {
    successNode: stepReadDataRepoDirectory,
    failureNode: stepCreateRepoDirectory
  });
  const stepReadDataDirectory = createActionNode(fileSystemGetDirectoriesAndFiles({path: dataDirectory}), {
    successNode: stepIsTheDataDirectorySetUp,
  });
  return createStrategy({
    topic: logixUXServerInitializationStrategyTopic,
    initialNode: stepReadDataDirectory,
  });
};
/*#>*/