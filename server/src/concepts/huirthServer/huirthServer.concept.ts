/*<$
For the graph programming framework Stratimux generate a Brand Server Concept called huirth Server that will be responsible for all server side qualities and principle.
$>*/
/*<#*/
import { createConcept, Concept, muxifyConcepts, PrincipleFunction, MuxiumDeck } from 'stratimux';
import { HuirthDeck, huirthState } from '../huirth/huirth.concept';
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
import { huirthServerTriggerSaveDataSetSelectionJSONLStrategy } from './qualities/triggerSaveDataSetSelectionJSONLStrategy.quality';
import { UserInterfaceServerDeck } from '../userInterfaceServer/userInterfaceServer.concept';
import { WebSocketServerDeck } from '../webSocketServer/webSocketServer.concept';
import { FileSystemDeck } from '../fileSystem/fileSystem.concept';
import { huirthServerArcChallengeParseFileFromData } from './qualities/parseArcChallengeFromData.quality';
import { huirthServerArcChallengeReadParseAppendStrategy } from './qualities/arcChallengeReadParseAppendStrategy.quality';
import { huirthServerReadFromDataArcTrainingDataFromDirectories } from './qualities/readFromDataArcTrainingDataFromDirectory.quality copy';
import { huirthServerAppendParsedDataToNamedDataSetSilent } from './qualities/appendParsedDataToNamedDataSetSilent.quality';

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
  huirthServerTriggerSaveDataSetSelectionJSONLStrategy,
  huirthServerTriggerDeleteDataSetsStrategy,
  huirthServerSetRepositoriesFromData,
  huirthServerParseFileFromData,
  huirthServerDetermineReadParseAppendStrategy,
  huirthServerAppendParsedDataToNamedDataSet,
  huirthServerAppendParsedDataToNamedDataSetSilent,
  huirthServerPrepareParsedProjectDataUpdate,
  huirthServerInnerAddTo,
  huirthServerGenerateVerboseAddingStrategy,
  huirthServerTriggerSelectTransformationStrategy,
  huirthServerInnerSubtractFrom,
  huirthServerGenerateVerboseSubtractionStrategy,
  huirthServerGenerateVerboseAdditionAndSubtractionStrategy,
  huirthServerGitPullRepository,
  huirthServerArcChallengeParseFileFromData,
  huirthServerArcChallengeReadParseAppendStrategy,
  huirthServerReadFromDataArcTrainingDataFromDirectories,
};

export type HuirthServerDeck = {
  huirthServer: Concept<huirthServerState, typeof qualities>;
} & HuirthDeck &
  UserInterfaceServerDeck &
  WebSocketServerDeck &
  MuxiumDeck &
  FileSystemDeck;

export type HuirthServerPrinciple = PrincipleFunction<typeof qualities, HuirthServerDeck, huirthServerState>;

export const createHuirthServerConcept = () => {
  const principles = [huirthServerPrinciple, huirthServerExitPrinciple];
  return muxifyConcepts([], createConcept(huirthServerName, {} as huirthServerState, qualities, principles, []));
};
/*#>*/
