/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will set up the data directory as needed, otherwise will record its contents to the state.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import path from 'path';
import { fileSystemGetDirectoriesAndFiles } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { huirthServerReadFromDataTrainingDataFromDirectories } from '../qualities/readFromDataTrainingDataFromDirectory.quality';
import { huirthServerIsDataDirectorySetUp } from '../qualities/isDataDirectorySetUp.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { dataDirectories } from '../huirthServer.model';
import { huirthServerSetRepositoriesFromData } from '../qualities/setRepositoriesFromData.quality';
import { huirthServerSetTrainingDataFromData } from '../qualities/setTrainingDataFromData.quality';
import { huirthSetTrainingDataInitialized } from '../../huirth/qualities/setTrainingDataInitialized.quality';
import { HuirthServerDeck } from '../huirthServer.concept';

const huirthServerInitializationStrategyTopic = 'huirth Server Initialization Strategy';
export const huirthServerInitializationStrategy = (root: string, deck: Deck<HuirthServerDeck>) => {
  const dataDirectory = path.join(root + '/data/');
  const dataSetsDirectory = path.join(root + '/data/sets/');
  // const DPODirectory = path.join(root + '/data/huirth');
  const gitRepoDirectory = path.join(root + '/data/' + dataDirectories.gitRepo + '/');
  const gitSetsDirectory = path.join(root + '/data/' + dataDirectories.sets + '/');
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  const stepSetTrainingDataInitialized = createActionNode(deck.huirth.e.huirthSetTrainingDataInitialized());
  const stepSetTrainingDataFromData = createActionNode(deck.huirthServer.e.huirthServerSetTrainingDataFromData(), {
    successNode: stepSetTrainingDataInitialized,
  });
  const stepReadTrainingDataFromData = createActionNode(deck.huirthServer.e.huirthServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepSetTrainingDataFromData,
  });
  const stepVerifyDataSets = createActionNode(deck.fileSystem.e.fileSystemGetDirectoriesAndFiles({ path: dataSetsDirectory }), {
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
  const stepSetRepositoriesFromData = createActionNode(deck.huirthServer.e.huirthServerSetRepositoriesFromData(), {
    // No need to worry about setting status beyond installed here. In the next steps we will verify all currently installed data sources.
    successNode: stepVerifyDataSets,
  });
  const stepReadDataRepoDirectory = createActionNode(deck.fileSystem.e.fileSystemGetDirectoriesAndFiles({ path: gitRepoDirectory }), {
    successNode: stepSetRepositoriesFromData,
  });
  const stepCreateSetsDirectory = createActionNode(deck.fileSystem.e.fileSystemCreateTargetDirectory({ path: gitSetsDirectory }), {
    successNode: stepVerifyDataSets,
    agreement: 20000,
  });
  const stepCreateRepoDirectory = createActionNode(deck.fileSystem.e.fileSystemCreateTargetDirectory({ path: gitRepoDirectory }), {
    successNode: stepCreateSetsDirectory,
    agreement: 20000,
  });
  const stepIsTheDataDirectorySetUp = createActionNode(deck.huirthServer.e.huirthServerIsDataDirectorySetUp(), {
    successNode: stepReadDataRepoDirectory,
    failureNode: stepCreateRepoDirectory,
  });
  const stepReadDataDirectoryAgain = createActionNode(deck.fileSystem.e.fileSystemGetDirectoriesAndFiles({ path: dataDirectory }), {
    successNode: stepIsTheDataDirectorySetUp,
  });
  const stepFailedFindingDataDirector = createActionNode(deck.fileSystem.e.fileSystemCreateTargetDirectory({ path: dataDirectory }), {
    successNode: stepReadDataDirectoryAgain,
  });
  const stepReadDataDirectory = createActionNode(deck.fileSystem.e.fileSystemGetDirectoriesAndFiles({ path: dataDirectory }), {
    successNode: stepIsTheDataDirectorySetUp,
    failureNode: stepFailedFindingDataDirector,
  });
  return createStrategy({
    topic: huirthServerInitializationStrategyTopic,
    initialNode: stepReadDataDirectory,
  });
};
/*#>*/
