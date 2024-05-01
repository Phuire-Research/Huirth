/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will set up the data directory as needed, otherwise will record its contents to the state.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemGetDirectoriesAndFiles } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { huirthServerReadFromDataTrainingDataFromDirectories } from '../qualities/readFromDataTrainingDataFromDirectory.quality';
import { huirthServerSetDPOFromData } from '../qualities/setDPOFromData.quality';
import { huirthServerIsDataDirectorySetUp } from '../qualities/isDataDirectorySetUp.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { dataDirectories } from '../huirthServer.model';
import { huirthServerSetRepositoriesFromData } from '../qualities/setRepositoriesFromData.quality';
import { huirthServerSetTrainingDataFromData } from '../qualities/setTrainingDataFromData.quality';

const huirthServerInitializationStrategyTopic = 'huirth Server Initialization Strategy';
export const huirthServerInitializationStrategy = (root: string) => {
  const dataDirectory = path.join(root + '/data/');
  const dataSetsDirectory = path.join(root + '/data/sets/');
  const DPODirectory = path.join(root + '/data/huirth');
  const gitRepoDirectory = path.join(root + '/data/' + dataDirectories.gitRepo + '/');
  const gitSetsDirectory = path.join(root + '/data/' + dataDirectories.sets + '/');
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  const stepSetTrainingDataFromData = createActionNode(huirthServerSetTrainingDataFromData());
  const stepReadTrainingDataFromData = createActionNode(huirthServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepSetTrainingDataFromData,
  });
  const stepVerifyDataSets = createActionNode(fileSystemGetDirectoriesAndFiles({path: dataSetsDirectory}), {
    successNode: stepReadTrainingDataFromData,
  });
  const stepSetDPO_data = createActionNode(huirthServerSetDPOFromData(), {
    successNode: stepVerifyDataSets,
  });
  const stepReadDPOFromData = createActionNode(huirthServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepSetDPO_data,
  });
  const stepVerifyDPOData = createActionNode(fileSystemGetDirectoriesAndFiles({path: DPODirectory}), {
    successNode: stepReadDPOFromData,
  });
  const stepSetRepositoriesFromData = createActionNode(huirthServerSetRepositoriesFromData(), {
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
  const stepIsTheDataDirectorySetUp = createActionNode(huirthServerIsDataDirectorySetUp(), {
    successNode: stepReadDataRepoDirectory,
    failureNode: stepCreateRepoDirectory
  });
  const stepReadDataDirectory = createActionNode(fileSystemGetDirectoriesAndFiles({path: dataDirectory}), {
    successNode: stepIsTheDataDirectorySetUp,
  });
  return createStrategy({
    topic: huirthServerInitializationStrategyTopic,
    initialNode: stepReadDataDirectory,
  });
};
/*#>*/