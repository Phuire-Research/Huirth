/*<$
For the graph programming framework Stratimux generate a Brand Server Concept called huirth Server that will be responsible for all server side qualities and principle.
$>*/
/*<#*/
import { createConcept, Concept, muxifyConcepts, PrincipleFunction, MuxiumDeck } from '@phuire/stratimux';
import { huirthState } from '../huirth/huirth.concept';
import { huirthServerTriggerSaveTrainingDataStrategy } from './qualities/triggerSaveTrainingDataStrategy.quality';
import { huirthServerPrinciple } from './huirthServer.principle';
import { huirthServerReadFromDataTrainingDataFromDirectories } from './qualities/readFromDataTrainingDataFromDirectory.quality';
import { huirthServerSetDPOFromData } from './qualities/setDPOFromData.quality';
import { huirthServerTriggerSaveDPOStrategy } from './qualities/triggerSaveDPOStrategy.quality';
import { huirthServerIsDataDirectorySetUp } from './qualities/isDataDirectorySetUp.quality';
import { huirthServerTriggerCloneGitRepositoryStrategy } from './qualities/triggerCloneGitRepositoryStrategy.quality';
import { huirthServerGitCloneRepoToDirectory } from './qualities/gitCloneRepoToDirectory.quality';
import { huirthServerSetRepositoriesFromData } from './qualities/setRepositoriesFromData.quality';
import { huirthServerTriggerParseRepositoryStrategy } from './qualities/triggerParseRepositoryIntoDataSet.quality';
import { huirthServerParseFileFromData } from './qualities/parseFileFromData.quality';
import { huirthServerDetermineReadParseAppendStrategy } from './qualities/determineReadParseAppendStrategy.quality';
import { huirthServerAppendParsedDataToNamedDataSet } from './qualities/appendParsedDataToNamedDataSet.quality';
import { huirthServerPrepareParsedProjectDataUpdate } from './qualities/prepareUpdateParsedProjectData.quality';
import { huirthServerTriggerSaveDataSetSelectionStrategy } from './qualities/triggerSaveDataSetSelectionStrategy.quality';
import { huirthServerSetTrainingDataFromData } from './qualities/setTrainingDataFromData.quality';
import { huirthServerTriggerDeleteDataSetsStrategy } from './qualities/triggerDeleteDataSetsStrategy.quality';
import { huirthServerInnerAddTo } from './qualities/innerAddTo.quality';
import { huirthServerGenerateVerboseAddingStrategy } from './qualities/generateVerboseAddingDataSet.quality';
import { huirthServerTriggerSelectTransformationStrategy } from './qualities/triggerSelectedTransformationStrategy.quality';
import { huirthServerInnerSubtractFrom } from './qualities/innerSubtractFrom.quality';
import { huirthServerGenerateVerboseSubtractionStrategy } from './qualities/generateVerboseSubtractionDataSet.quality';
import { huirthServerGenerateVerboseAdditionAndSubtractionStrategy } from './qualities/generateVerboseAdditionAndSubtractionDataSet.quality';
import { huirthServerExitPrinciple } from './huirthServer.exit.principle';
import { huirthServerGitPullRepository } from './qualities/gitPullRepository.quality';
import { huirthServerTriggerGitPullRepositoryStrategy } from './qualities/triggerGitPullRepositoryStrategy.quality';

export const huirthServerName = 'huirthServer';
export type huirthServerState = {
  //
} & huirthState;

const qualities = {
  huirthServerTriggerSaveTrainingDataStrategy,
  huirthServerTriggerSaveDPOStrategy,
  huirthServerReadFromDataTrainingDataFromDirectories,
  huirthServerSetDPOFromData,
  huirthServerSetTrainingDataFromData,
  huirthServerIsDataDirectorySetUp,
  huirthServerGitCloneRepoToDirectory,
  huirthServerTriggerCloneGitRepositoryStrategy,
  huirthServerTriggerGitPullRepositoryStrategy,
  huirthServerTriggerParseRepositoryStrategy,
  huirthServerTriggerSaveDataSetSelectionStrategy,
  huirthServerTriggerDeleteDataSetsStrategy,
  huirthServerSetRepositoriesFromData,
  huirthServerParseFileFromData,
  huirthServerDetermineReadParseAppendStrategy,
  huirthServerAppendParsedDataToNamedDataSet,
  huirthServerPrepareParsedProjectDataUpdate,
  huirthServerInnerAddTo,
  huirthServerGenerateVerboseAddingStrategy,
  huirthServerTriggerSelectTransformationStrategy,
  huirthServerInnerSubtractFrom,
  huirthServerGenerateVerboseSubtractionStrategy,
  huirthServerGenerateVerboseAdditionAndSubtractionStrategy,
  huirthServerGitPullRepository,
};

export type HuirthServerDeck = {
  huirthServer: Concept<huirthServerState, typeof qualities>;
};

export type HuirthServerPrinciple = PrincipleFunction<typeof qualities, MuxiumDeck & HuirthServerDeck, huirthServerState>;

export const createHuirthServerConcept = () => {
  const principles = [huirthServerPrinciple, huirthServerExitPrinciple];
  return muxifyConcepts([], createConcept(huirthServerName, {} as huirthServerState, qualities, principles, []));
};
/*#>*/
