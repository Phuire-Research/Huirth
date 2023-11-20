import { createConcept, Concept, unifyConcepts, createCounterConcept, PrincipleFunction, Quality } from 'stratimux';
import { LogixUXState } from '../logixUX/logixUX.concept';
import { logixUXServerTriggerSaveTrainingDataStrategyQuality } from './qualities/triggerSaveTrainingDataStrategy.quality';
import { logixUXServerPrinciple } from './logixUXServer.principle';
import { logixUXServerReadFromDataTrainingDataFromDirectoriesQuality } from './qualities/readFromDataTrainingDataFromDirectory.quality';
import { logixUXServerSetDPOFromDataQuality } from './qualities/setDPOFromData.quality';
import { logixUXServerTriggerSaveDPOStrategyQuality } from './qualities/triggerSaveDPOStrategy.quality';
import { logixUXServerIsDataDirectorySetUpQuality } from './qualities/isDataDirectorySetUp.quality';
import { logixUXServerTriggerCloneGitRepositoryStrategyQuality } from './qualities/triggerCloneGitRepositoryStrategy.quality';
import { logixUXServerGitCloneRepoToDirectoryQuality } from './qualities/gitCloneRepoToDirectory.quality';
import { logixUXServerSetRepositoriesFromDataQuality } from './qualities/setRepositoriesFromData.quality';
import { logixUXServerTriggerParseRepositoryStrategyQuality } from './qualities/triggerParseRepositoryIntoDataSet.quality';
import { logixUXServerParseFileFromDataQuality } from './qualities/parseFileFromData.quality';

export const logixUXServerName = 'logixUXServer';
export type LogixUXServerState = {
  //
} & LogixUXState;

export const createLogixUXServerConcept = (): Concept =>  {
  const principles: PrincipleFunction[] = [
    logixUXServerPrinciple
  ];
  const qualities: Quality[] = [
    logixUXServerTriggerSaveTrainingDataStrategyQuality,
    logixUXServerTriggerSaveDPOStrategyQuality,
    logixUXServerReadFromDataTrainingDataFromDirectoriesQuality,
    logixUXServerSetDPOFromDataQuality,
    logixUXServerIsDataDirectorySetUpQuality,
    logixUXServerGitCloneRepoToDirectoryQuality,
    logixUXServerTriggerCloneGitRepositoryStrategyQuality,
    logixUXServerTriggerParseRepositoryStrategyQuality,
    logixUXServerSetRepositoriesFromDataQuality,
    logixUXServerParseFileFromDataQuality
  ];
  // This is temporary, the complete flow would allow for all server logic to remain on the server.
  return unifyConcepts(
    [
    ],
    createConcept(
      logixUXServerName,
      {},
      qualities,
      principles,
      []
    ));
};
