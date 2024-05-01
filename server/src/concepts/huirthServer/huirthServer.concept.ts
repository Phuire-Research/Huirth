/*<$
For the graph programming framework Stratimux generate a Brand Server Concept called huirth Server that will be responsible for all server side qualities and principle.
$>*/
/*<#*/
import { createConcept, Concept, unifyConcepts, PrincipleFunction, Quality } from 'stratimux';
import { huirthState } from '../huirth/huirth.concept';
import { huirthServerTriggerSaveTrainingDataStrategyQuality } from './qualities/triggerSaveTrainingDataStrategy.quality';
import { huirthServerPrinciple } from './huirthServer.principle';
import { huirthServerReadFromDataTrainingDataFromDirectoriesQuality } from './qualities/readFromDataTrainingDataFromDirectory.quality';
import { huirthServerSetDPOFromDataQuality } from './qualities/setDPOFromData.quality';
import { huirthServerTriggerSaveDPOStrategyQuality } from './qualities/triggerSaveDPOStrategy.quality';
import { huirthServerIsDataDirectorySetUpQuality } from './qualities/isDataDirectorySetUp.quality';
import { huirthServerTriggerCloneGitRepositoryStrategyQuality } from './qualities/triggerCloneGitRepositoryStrategy.quality';
import { huirthServerGitCloneRepoToDirectoryQuality } from './qualities/gitCloneRepoToDirectory.quality';
import { huirthServerSetRepositoriesFromDataQuality } from './qualities/setRepositoriesFromData.quality';
import { huirthServerTriggerParseRepositoryStrategyQuality } from './qualities/triggerParseRepositoryIntoDataSet.quality';
import { huirthServerParseFileFromDataQuality } from './qualities/parseFileFromData.quality';
import { huirthServerDetermineReadParseAppendStrategyQuality } from './qualities/determineReadParseAppendStrategy.quality';
import { huirthServerAppendParsedDataToNamedDataSetQuality } from './qualities/appendParsedDataToNamedDataSet.quality';
import { huirthServerPrepareParsedProjectDataUpdateQuality } from './qualities/prepareUpdateParsedProjectData.quality';
import { huirthServerTriggerSaveDataSetSelectionStrategyQuality } from './qualities/triggerSaveDataSetSelectionStrategy.quality';
import { huirthServerSetTrainingDataFromDataQuality } from './qualities/setTrainingDataFromData.quality';
import { huirthServerTriggerDeleteDataSetsStrategyQuality } from './qualities/triggerDeleteDataSetsStrategy.quality';
import { huirthServerInnerAddToQuality } from './qualities/innerAddTo.quality';
import { huirthServerGenerateVerboseAddingStrategyQuality } from './qualities/generateVerboseAddingDataSet.quality';
import { huirthServerTriggerSelectTransformationStrategyQuality } from './qualities/triggerSelectedTransformationStrategy.quality';
import { huirthServerInnerSubtractFromQuality } from './qualities/innerSubtractFrom.quality';
import { huirthServerGenerateVerboseSubtractionStrategyQuality } from './qualities/generateVerboseSubtractionDataSet.quality';
import { huirthServerGenerateVerboseAdditionAndSubtractionStrategyQuality } from './qualities/generateVerboseAdditionAndSubtractionDataSet.quality';
import { huirthServerExitPrinciple } from './huirthServer.exit.principle';
import { huirthServerGitPullRepositoryQuality } from './qualities/gitPullRepository.quality';
import { huirthServerTriggerGitPullRepositoryStrategyQuality } from './qualities/triggerGitPullRepositoryStrategy.quality';

export const huirthServerName = 'huirthServer';
export type huirthServerState = {
  //
} & huirthState;

export const createHuirthServerConcept = (): Concept =>  {
  const principles: PrincipleFunction[] = [
    huirthServerPrinciple,
    huirthServerExitPrinciple
  ];
  const qualities: Quality[] = [
    huirthServerTriggerSaveTrainingDataStrategyQuality,
    huirthServerTriggerSaveDPOStrategyQuality,
    huirthServerReadFromDataTrainingDataFromDirectoriesQuality,
    huirthServerSetDPOFromDataQuality,
    huirthServerSetTrainingDataFromDataQuality,
    huirthServerIsDataDirectorySetUpQuality,
    huirthServerGitCloneRepoToDirectoryQuality,
    huirthServerTriggerCloneGitRepositoryStrategyQuality,
    huirthServerTriggerGitPullRepositoryStrategyQuality,
    huirthServerTriggerParseRepositoryStrategyQuality,
    huirthServerTriggerSaveDataSetSelectionStrategyQuality,
    huirthServerTriggerDeleteDataSetsStrategyQuality,
    huirthServerSetRepositoriesFromDataQuality,
    huirthServerParseFileFromDataQuality,
    huirthServerDetermineReadParseAppendStrategyQuality,
    huirthServerAppendParsedDataToNamedDataSetQuality,
    huirthServerPrepareParsedProjectDataUpdateQuality,
    huirthServerInnerAddToQuality,
    huirthServerGenerateVerboseAddingStrategyQuality,
    huirthServerTriggerSelectTransformationStrategyQuality,
    huirthServerInnerSubtractFromQuality,
    huirthServerGenerateVerboseSubtractionStrategyQuality,
    huirthServerGenerateVerboseAdditionAndSubtractionStrategyQuality,
    huirthServerGitPullRepositoryQuality
  ];
  return unifyConcepts(
    [
    ],
    createConcept(
      huirthServerName,
      {},
      qualities,
      principles,
      []
    ));
};
/*#>*/