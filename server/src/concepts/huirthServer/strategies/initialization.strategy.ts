/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will set up the data directory as needed, otherwise will record its contents to the state.
$>*/
/*<#*/
import { createActionNode, createStrategy } from '@phuire/stratimux';
import path from 'path';
import { fileSystemGetDirectoriesAndFiles } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { huirthServerReadFromDataTrainingDataFromDirectories } from '../qualities/readFromDataTrainingDataFromDirectory.quality';
import { huirthServerIsDataDirectorySetUp } from '../qualities/isDataDirectorySetUp.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { dataDirectories } from '../huirthServer.model';
import { huirthServerSetRepositoriesFromData } from '../qualities/setRepositoriesFromData.quality';
import { huirthServerSetTrainingDataFromData } from '../qualities/setTrainingDataFromData.quality';
import { huirthSetTrainingDataInitialized } from '../../huirth/qualities/setTrainingDataInitialized.quality';

const huirthServerInitializationStrategyTopic = 'huirth Server Initialization Strategy';
export const huirthServerInitializationStrategy = (root: string) => {
  const dataDirectory = path.join(root + '/data/');
  const dataSetsDirectory = path.join(root + '/data/sets/');
  // const DPODirectory = path.join(root + '/data/huirth');
  const gitRepoDirectory = path.join(root + '/data/' + dataDirectories.gitRepo + '/');
  const gitSetsDirectory = path.join(root + '/data/' + dataDirectories.sets + '/');
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  const stepSetTrainingDataInitialized = createActionNode(huirthSetTrainingDataInitialized.actionCreator());
  const stepSetTrainingDataFromData = createActionNode(huirthServerSetTrainingDataFromData.actionCreator(), {
    successNode: stepSetTrainingDataInitialized,
  });
  const stepReadTrainingDataFromData = createActionNode(huirthServerReadFromDataTrainingDataFromDirectories.actionCreator(), {
    successNode: stepSetTrainingDataFromData,
  });
  const stepVerifyDataSets = createActionNode(fileSystemGetDirectoriesAndFiles.actionCreator({ path: dataSetsDirectory }), {
    successNode: stepReadTrainingDataFromData,
  });
  // const stepSetDPO_data = createActionNode(huirthServerSetDPOFromData(), {
  //   successNode: stepVerifyDataSets,
  // });
  // const stepReadDPOFromData = createActionNode(huirthServerReadFromDataTrainingDataFromDirectories(), {
  //   successNode: stepSetDPO_data,
  // });
  // const stepVerifyDPOData = createActionNode(fileSystemGetDirectoriesAndFiles({path: DPODirectory}), {
  //   successNode: stepReadDPOFromData,
  // });
  const stepSetRepositoriesFromData = createActionNode(huirthServerSetRepositoriesFromData.actionCreator(), {
    // No need to worry about setting status beyond installed here. In the next steps we will verify all currently installed data sources.
    successNode: stepVerifyDataSets,
  });
  const stepReadDataRepoDirectory = createActionNode(fileSystemGetDirectoriesAndFiles.actionCreator({ path: gitRepoDirectory }), {
    successNode: stepSetRepositoriesFromData,
  });
  const stepCreateSetsDirectory = createActionNode(fileSystemCreateTargetDirectory.actionCreator({ path: gitSetsDirectory }), {
    successNode: stepVerifyDataSets,
    agreement: 20000,
  });
  const stepCreateRepoDirectory = createActionNode(fileSystemCreateTargetDirectory.actionCreator({ path: gitRepoDirectory }), {
    successNode: stepCreateSetsDirectory,
    agreement: 20000,
  });
  const stepIsTheDataDirectorySetUp = createActionNode(huirthServerIsDataDirectorySetUp.actionCreator(), {
    successNode: stepReadDataRepoDirectory,
    failureNode: stepCreateRepoDirectory,
  });
  const stepReadDataDirectoryAgain = createActionNode(fileSystemGetDirectoriesAndFiles.actionCreator({ path: dataDirectory }), {
    successNode: stepIsTheDataDirectorySetUp,
  });
  const stepFailedFindingDataDirector = createActionNode(fileSystemCreateTargetDirectory.actionCreator({ path: dataDirectory }), {
    successNode: stepReadDataDirectoryAgain,
  });
  const stepReadDataDirectory = createActionNode(fileSystemGetDirectoriesAndFiles.actionCreator({ path: dataDirectory }), {
    successNode: stepIsTheDataDirectorySetUp,
    failureNode: stepFailedFindingDataDirector,
  });
  return createStrategy({
    topic: huirthServerInitializationStrategyTopic,
    initialNode: stepReadDataDirectory,
  });
};
/*#>*/
