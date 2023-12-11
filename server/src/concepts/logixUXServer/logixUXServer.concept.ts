/*<$
For the graph programming framework Stratimux generate a Brand Server Concept called LogixUX Server that will be responsible for all server side qualities and principle.
$>*/
/*<#*/
import { createConcept, Concept, unifyConcepts, PrincipleFunction, Quality } from 'stratimux';
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
import { logixUXServerDetermineReadParseAppendStrategyQuality } from './qualities/determineReadParseAppendStrategy.quality';
import { logixUXServerAppendParsedDataToNamedDataSetQuality } from './qualities/appendParsedDataToNamedDataSet.quality';
import { logixUXServerPrepareParsedProjectDataUpdateQuality } from './qualities/prepareUpdateParsedProjectData.quality';
import { logixUXServerTriggerSaveDataSetSelectionStrategyQuality } from './qualities/triggerSaveDataSetSelectionStrategy.quality';
import { logixUXServerSetTrainingDataFromDataQuality } from './qualities/setTrainingDataFromData.quality';
import { logixUXServerTriggerDeleteDataSetsStrategyQuality } from './qualities/triggerDeleteDataSetsStrategy.quality';
import { logixUXServerInnerAddToQuality } from './qualities/innerAddTo.quality';
import { logixUXServerGenerateVerboseAddingStrategyQuality } from './qualities/generateVerboseAddingDataSet.quality';
import { logixUXServerTriggerSelectTransformationStrategyQuality } from './qualities/triggerSelectedTransformationStrategy.quality';
import { logixUXServerInnerSubtractFromQuality } from './qualities/innerSubtractFrom.quality';
import { logixUXServerGenerateVerboseSubtractionStrategyQuality } from './qualities/generateVerboseSubtractionDataSet.quality';
import { logixUXServerGenerateVerboseAdditionAndSubtractionStrategyQuality } from './qualities/generateVerboseAdditionAndSubtractionDataSet.quality';
import { logixUXServerExitPrinciple } from './logixUXServer.exit.principle';
import { logixUXServerGitPullRepositoryQuality } from './qualities/gitPullRepository.quality';
import { logixUXServerTriggerGitPullRepositoryStrategyQuality } from './qualities/triggerGitPullRepositoryStrategy.quality';

export const logixUXServerName = 'logixUXServer';
export type LogixUXServerState = {
  //
} & LogixUXState;

export const createLogixUXServerConcept = (): Concept =>  {
  const principles: PrincipleFunction[] = [
    logixUXServerPrinciple,
    logixUXServerExitPrinciple
  ];
  const qualities: Quality[] = [
    logixUXServerTriggerSaveTrainingDataStrategyQuality,
    logixUXServerTriggerSaveDPOStrategyQuality,
    logixUXServerReadFromDataTrainingDataFromDirectoriesQuality,
    logixUXServerSetDPOFromDataQuality,
    logixUXServerSetTrainingDataFromDataQuality,
    logixUXServerIsDataDirectorySetUpQuality,
    logixUXServerGitCloneRepoToDirectoryQuality,
    logixUXServerTriggerCloneGitRepositoryStrategyQuality,
    logixUXServerTriggerGitPullRepositoryStrategyQuality,
    logixUXServerTriggerParseRepositoryStrategyQuality,
    logixUXServerTriggerSaveDataSetSelectionStrategyQuality,
    logixUXServerTriggerDeleteDataSetsStrategyQuality,
    logixUXServerSetRepositoriesFromDataQuality,
    logixUXServerParseFileFromDataQuality,
    logixUXServerDetermineReadParseAppendStrategyQuality,
    logixUXServerAppendParsedDataToNamedDataSetQuality,
    logixUXServerPrepareParsedProjectDataUpdateQuality,
    logixUXServerInnerAddToQuality,
    logixUXServerGenerateVerboseAddingStrategyQuality,
    logixUXServerTriggerSelectTransformationStrategyQuality,
    logixUXServerInnerSubtractFromQuality,
    logixUXServerGenerateVerboseSubtractionStrategyQuality,
    logixUXServerGenerateVerboseAdditionAndSubtractionStrategyQuality,
    logixUXServerGitPullRepositoryQuality
  ];
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
/*#>*/