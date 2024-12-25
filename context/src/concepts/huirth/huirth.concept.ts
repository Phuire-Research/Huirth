/*<$
For the graph programming framework Stratimux generate a Brand Concept called huirth that will act as a Sidekick Application for the Stratimux Framework.
$>*/
/*<#*/
import {
  createConcept,
  Concept,
  muxifyConcepts,
  createCounterConcept,
  PrincipleFunction,
  Quality,
  MuxiumDeck,
  CounterDeck,
} from 'stratimux';
import { ActionComponentPayload, BrandState } from '../../model/userInterface';
import { huirthError } from './qualities/components/error/error.quality';
import { huirthHead } from './qualities/components/head.quality';
import { huirthStyle } from './qualities/components/style.quality';
import { huirthFooter } from './qualities/components/footer.quality';
import { huirthIndexHero } from './qualities/components/hero/indexHero.quality';
import { huirthIndexDialogBegin } from './qualities/components/dialog/indexDialogBegin.quality';
import { huirthIndexDialogContent } from './qualities/components/dialog/indexDialogContent.quality';
import { huirthIndexDialogEnd } from './qualities/components/dialog/indexDialogEnd.quality';
import { huirthAppendMuxiumDialog, huirthAppendMuxiumDialogTypePayload } from './qualities/appendMuxiumDialog.quality';
import { huirthDialogPrinciple } from './huirth.principle';
import { huirthTrainingDataPagePrinciple } from './huirth.trainingDataPage.principle';
import { huirthIndexPageStrategy } from './strategies/pages/indexPage.strategy';
import { huirthErrorPageStrategy } from './strategies/pages/errorPage.strategy';
import { huirthIndexDPOBegin } from './qualities/components/DPO/DPOBegin.quality';
import { huirthIndexDPOContent } from './qualities/components/DPO/DPOContent.quality';
import { huirthIndexDPOEnd } from './qualities/components/DPO/DPOEnd.quality';
import { huirthUpdateFromPromptPayload } from './qualities/updateFromPromptPayload.quality';
import { huirthUpdateFromChosenPayload } from './qualities/updateFromChosenPayload.quality';
import { huirthUpdateFromRejectedPayload } from './qualities/updateFromRejectedPayload.quality';
import {
  Active_DPO,
  GeneralProjectStatuses,
  ProjectStatus,
  TrainingData,
  generateDPOTrainingData,
  generateDefaultTrainingData,
  huirthGenerateArcTrainingDataSets,
  huirthVerboseAddingStrategySelect,
  huirthVerboseAdditionAndSubtractionStrategySelect,
  huirthVerboseSubtractionStrategySelect,
} from './huirth.model';
import { huirthNewDataSetEntry, huirthNewDataSetEntryPayload } from './qualities/newDataSetEntry.quality';
import { huirthTriggerMinusCountingStrategy } from './qualities/triggerMinusCounterStrategy.quality';
import { huirthTriggerPlusCountingStrategy } from './qualities/triggerPlusCounterStrategy.quality';
import { huirthTriggerRandomCountingStrategy } from './qualities/triggerRandomCounterStrategy.quality';
import { huirthDataManagerPageStrategy } from './strategies/pages/dataManagerPage.strategy';
import { huirthDataManagerBegin } from './qualities/components/dataManager/dataManagerBegin.quality';
import { huirthDataManagerContent } from './qualities/components/dataManager/dataManagerContent.quality';
import { huirthDataManagerEnd } from './qualities/components/dataManager/dataManagerEnd.quality';
import { huirthSideBarBegin } from './qualities/components/sideBar/sideBarBegin.quality';
import { huirthSideBarContent } from './qualities/components/sideBar/sideBarContent.quality';
import { huirthSideBarEnd } from './qualities/components/sideBar/sideBarEnd.quality';
import { huirthToggleSidebar } from './qualities/toggleSidebar.quality';
import { huirthNewDPOEntry } from './qualities/newDPOEntry.quality';
import { huirthNewDataSet } from './qualities/newDataSet.quality';
import { huirthUpdateDataSetName, huirthUpdateDataSetNamePayload } from './qualities/updateDataSetName.quality';
import { huirthDataSetBegin } from './qualities/components/dataSet/dataSetBegin.quality';
import { huirthDataSetEnd } from './qualities/components/dataSet/dataSetEnd.quality';
import { huirthDataSetContent } from './qualities/components/dataSet/dataSetContent.quality';
import { huirthUpdateDataSetContents, huirthUpdateDataSetContentsPayload } from './qualities/updateDataSetContents.quality';
import {
  huirthUpdateDataSetSystemInstructions,
  huirthUpdateDataSetSystemInstructionsPayload,
} from './qualities/updateDataSetSystemInstructions.quality';
import { huirthUpdateProjectStatus, huirthUpdateProjectStatusPayload } from './qualities/updateProjectToStatus.quality';
import {
  huirthTriggerInstallGitRepository,
  huirthTriggerInstallGitRepositoryPayload,
} from './qualities/triggerInstallGitRepository.quality';
import { huirthUpdateParsedProjectDataSet, huirthUpdateParsedProjectDataSetPayload } from './qualities/updateParsedProjectDataSet.quality';
import { huirthUpdateDataSetSelection, huirthUpdateDataSetSelectionPayload } from './qualities/updateDataSetSelection.quality';
import {
  huirthSendTriggerParseRepositoryStrategy,
  huirthSendTriggerParseRepositoryStrategyPayload,
} from './qualities/sendTriggerParseRepositoryStrategy.quality';
import { huirthSendTriggerSaveDataSetSelectionStrategy } from './qualities/sendTriggerSaveDataSetSelectionStrategy.quality';
import { huirthUpdateProjectStatusToSaved, huirthUpdateProjectStatusToSavedPayload } from './qualities/updateProjectToSaved.quality';
import { huirthRemoveDataSetSelection } from './qualities/removeDataSetSelection.quality';
import {
  huirthSendTriggerDeleteDataSetsStrategy,
  huirthSendTriggerDeleteDataSetsStrategyPayload,
} from './qualities/sendTriggerDeleteDataSetsStrategy.quality';
import { huirthSetPossibleProject } from './qualities/setPossibleProject.quality';
import { huirthFilterTriggerInstallGitRepository } from './qualities/filterTriggerInstallGitRepository.quality';
import { huirthSetDataSet, huirthSetDataSetPayload } from './qualities/setDataSet.quality';
import { huirthSetSelectedTransformation } from './qualities/setSelectedTransformation.quality';
import { huirthSendTriggerSelectedTransformationStrategy } from './qualities/sendTriggerSelectedTransformationStrategy.quality';
import { huirthClearDataSetSelection } from './qualities/clearDataSetSelection.quality';
import { huirthSetTrainingDataPage, HuirthSetTrainingDataPagePayload } from './qualities/setTrainingDataPage.quality';
import { huirthFilterTrainingDataPage, HuirthFilterTrainingDataPagePayload } from './qualities/filterTrainingDataPage.quality';
import { huirthSetTrainingDataInitialized } from './qualities/setTrainingDataInitialized.quality';
import { HuirthTriggerAddTrainingDataPage, huirthTriggerAddTrainingDataPage } from './qualities/triggerAddTrainingDataPageStrategy.quality';
import {
  huirthSendAddTrainingPageStrategy,
  HuirthSendTriggerAddTrainingPageStrategy,
} from './qualities/sendTriggerAddTrainingPageStrategy.quality';
import {
  huirthSendRemoveAddTrainingPageStrategy,
  HuirthSendTriggerRemoveAddTrainingPageStrategy,
} from './qualities/sendTriggerRemoveAddTrainingPageStrategy.quality';
import {
  HuirthTriggerRemoveAddTrainingDataPage,
  huirthTriggerRemoveAddTrainingDataPage,
} from './qualities/triggerRemoveAddTrainingDataPageStrategy.quality';
import { createUserInterfaceState, UserInterfaceDeck, UserInterfaceState } from '../userInterface/userInterface.concept';
import { huirthSendTriggerSaveDataSetSelectionJSONLStrategy } from './qualities/sendTriggerSaveDataSetSelectionJSONLStrategy.quality';
import { HtmlDeck } from '../html/html.concepts';
import { WebSocketClientDeck } from '../webSocketClient/webSocketClient.concept';
import { huirthUpdateDataSetRole, huirthUpdateDataSetRolePayload } from './qualities/updateDataSetRole.quality';
import { huirthUpdateDataSetPosition, huirthUpdateDataSetPositionPayload } from './qualities/updateDataSetPosition.quality';
import { huirthUpdateDataSetPageIndex, huirthUpdateDataSetPageIndexPayload } from './qualities/updateDataSetPageIndex.quality';
import {
  huirthUpdateDataSetAddContentsEntry,
  huirthUpdateDataSetAddContentsEntryPayload,
} from './qualities/updateDataSetAddContentsEntry.quality';
import {
  huirthUpdateDataSetRemoveContentsEntry,
  huirthUpdateDataSetRemoveContentsEntryPayload,
} from './qualities/updateDataSetRemoveContentsEntry.quality';
import {
  huirthUpdateDataSetAddSystemInstructions,
  huirthUpdateDataSetAddSystemInstructionsPayload,
} from './qualities/updateDataSetAddSystemInstructions.quality';
import {
  huirthUpdateDataSetRemoveSystemInstructions,
  huirthUpdateDataSetRemoveSystemInstructionsPayload,
} from './qualities/updateDataSetRemoveSystemInstructions.quality copy';
import { huirthMergeDataSetSelection } from './qualities/mergeDataSetSelection.quality';
import { huirthMergeShuffleDataSetSelection } from './qualities/mergeShuffleDataSetSelection.quality';

export const huirthName = 'huirth';
export type huirthState = {
  mock: number;
  dialog: string;
  transformationStrategies: string[];
  selectedTransformation: string;
  possibleProject: string;
  possibleProjectValid: boolean;
  stratimuxStatus: ProjectStatus;
  huirthStatus: ProjectStatus;
  projectsStatuses: GeneralProjectStatuses;
  dataSetSelection: boolean[];
  sideBarExpanded: boolean;
  trainingDataInitialized: boolean;
  trainingData: TrainingData;
  trainingDataPages: string[];
  trainingDataCounter: number;
  activeDPO: Active_DPO[];
} & BrandState &
  UserInterfaceState;

const createHuirthState = (): huirthState => {
  return {
    ...createUserInterfaceState([]),
    mock: 0,
    dialog: '',
    transformationStrategies: [
      huirthVerboseAddingStrategySelect,
      huirthVerboseSubtractionStrategySelect,
      huirthVerboseAdditionAndSubtractionStrategySelect,
      huirthGenerateArcTrainingDataSets,
    ],
    selectedTransformation: 'Some Strategy',
    possibleProject: '',
    possibleProjectValid: false,
    stratimuxStatus: ProjectStatus.notInstalled,
    huirthStatus: ProjectStatus.notInstalled,
    projectsStatuses: [],
    dataSetSelection: [],
    sideBarExpanded: true,
    trainingDataInitialized: false,
    trainingData: generateDefaultTrainingData(),
    trainingDataPages: [],
    trainingDataCounter: -1,
    activeDPO: [generateDPOTrainingData()],
    pageStrategies: [huirthIndexPageStrategy, huirthDataManagerPageStrategy, huirthErrorPageStrategy],
  };
};

const qualities = {
  huirthHead,
  huirthStyle,
  huirthFooter,
  huirthSideBarBegin,
  huirthSideBarContent,
  huirthSideBarEnd,
  huirthIndexHero,
  huirthIndexDialogBegin,
  huirthIndexDialogContent,
  huirthIndexDialogEnd,
  huirthError,
  huirthAppendMuxiumDialog,
  huirthIndexDPOBegin,
  huirthIndexDPOContent,
  huirthIndexDPOEnd,
  huirthClearDataSetSelection,
  huirthDataManagerBegin,
  huirthDataManagerContent,
  huirthDataManagerEnd,
  huirthDataSetBegin,
  huirthDataSetContent,
  huirthDataSetEnd,
  huirthMergeDataSetSelection,
  huirthMergeShuffleDataSetSelection,
  huirthSendTriggerParseRepositoryStrategy,
  huirthSendTriggerSaveDataSetSelectionStrategy,
  huirthSendTriggerSaveDataSetSelectionJSONLStrategy,
  huirthSendTriggerDeleteDataSetsStrategy,
  huirthSendTriggerSelectedTransformationStrategy,
  huirthUpdateFromPromptPayload,
  huirthUpdateFromChosenPayload,
  huirthUpdateFromRejectedPayload,
  huirthUpdateDataSetPageIndex,
  huirthUpdateDataSetPosition,
  huirthUpdateDataSetRole,
  huirthUpdateDataSetContents,
  huirthUpdateDataSetAddContentsEntry,
  huirthUpdateDataSetRemoveContentsEntry,
  huirthUpdateDataSetSystemInstructions,
  huirthUpdateDataSetAddSystemInstructions,
  huirthUpdateDataSetRemoveSystemInstructions,
  huirthUpdateProjectStatus,
  huirthUpdateDataSetSelection,
  huirthUpdateParsedProjectDataSet,
  huirthUpdateProjectStatusToSaved,
  huirthUpdateDataSetName,
  huirthNewDataSetEntry,
  huirthNewDataSet,
  huirthNewDPOEntry,
  huirthRemoveDataSetSelection,
  huirthTriggerMinusCountingStrategy,
  huirthTriggerPlusCountingStrategy,
  huirthTriggerRandomCountingStrategy,
  huirthTriggerInstallGitRepository,
  huirthToggleSidebar,
  huirthSetPossibleProject,
  huirthFilterTriggerInstallGitRepository,
  huirthSetDataSet,
  huirthSetSelectedTransformation,
  huirthSetTrainingDataPage,
  huirthFilterTrainingDataPage,
  huirthSetTrainingDataInitialized,
  huirthSendAddTrainingPageStrategy,
  huirthTriggerAddTrainingDataPage,
  huirthSendRemoveAddTrainingPageStrategy,
  huirthTriggerRemoveAddTrainingDataPage,
};
type Qualities = {
  huirthHead: Quality<huirthState, ActionComponentPayload, any>;
  huirthStyle: Quality<huirthState, ActionComponentPayload, any>;
  huirthFooter: Quality<huirthState, ActionComponentPayload, any>;
  huirthSideBarBegin: Quality<huirthState, ActionComponentPayload, any>;
  huirthSideBarContent: Quality<huirthState, ActionComponentPayload, any>;
  huirthSideBarEnd: Quality<huirthState, ActionComponentPayload, any>;
  huirthIndexHero: Quality<huirthState, ActionComponentPayload, any>;
  huirthIndexDialogBegin: Quality<huirthState, ActionComponentPayload, any>;
  huirthIndexDialogContent: Quality<huirthState, ActionComponentPayload, any>;
  huirthIndexDialogEnd: Quality<huirthState, ActionComponentPayload, any>;
  huirthError: Quality<huirthState, ActionComponentPayload, any>;
  huirthAppendMuxiumDialog: Quality<huirthState, huirthAppendMuxiumDialogTypePayload, any>;
  huirthIndexDPOBegin: Quality<huirthState, ActionComponentPayload, any>;
  huirthIndexDPOContent: Quality<huirthState, ActionComponentPayload, any>;
  huirthIndexDPOEnd: Quality<huirthState, ActionComponentPayload, any>;
  huirthClearDataSetSelection: Quality<huirthState, void, any>;
  huirthDataManagerBegin: Quality<huirthState, ActionComponentPayload, any>;
  huirthDataManagerContent: Quality<huirthState, ActionComponentPayload, any>;
  huirthDataManagerEnd: Quality<huirthState, ActionComponentPayload, any>;
  huirthDataSetBegin: Quality<huirthState, ActionComponentPayload, any>;
  huirthDataSetContent: Quality<huirthState, ActionComponentPayload, any>;
  huirthDataSetEnd: Quality<huirthState, ActionComponentPayload, any>;
  huirthMergeDataSetSelection: Quality<huirthState, void, any>;
  huirthMergeShuffleDataSetSelection: Quality<huirthState, void, any>;
  huirthSendTriggerParseRepositoryStrategy: Quality<huirthState, huirthSendTriggerParseRepositoryStrategyPayload, any>;
  huirthSendTriggerSaveDataSetSelectionStrategy: Quality<huirthState, void, any>;
  huirthSendTriggerSaveDataSetSelectionJSONLStrategy: Quality<huirthState, void, any>;
  huirthSendTriggerDeleteDataSetsStrategy: Quality<huirthState, huirthSendTriggerDeleteDataSetsStrategyPayload, any>;
  huirthSendTriggerSelectedTransformationStrategy: Quality<huirthState, void, any>;
  huirthUpdateDataSetPageIndex: Quality<huirthState, huirthUpdateDataSetPageIndexPayload, any>;
  huirthUpdateDataSetPosition: Quality<huirthState, huirthUpdateDataSetPositionPayload, any>;
  huirthUpdateFromPromptPayload: Quality<huirthState, void, any>;
  huirthUpdateFromChosenPayload: Quality<huirthState, void, any>;
  huirthUpdateFromRejectedPayload: Quality<huirthState, void, any>;
  huirthUpdateDataSetName: Quality<huirthState, huirthUpdateDataSetNamePayload, any>;
  huirthUpdateDataSetRole: Quality<huirthState, huirthUpdateDataSetRolePayload, any>;
  huirthUpdateDataSetContents: Quality<huirthState, huirthUpdateDataSetContentsPayload, any>;
  huirthUpdateDataSetAddContentsEntry: Quality<huirthState, huirthUpdateDataSetAddContentsEntryPayload, any>;
  huirthUpdateDataSetRemoveContentsEntry: Quality<huirthState, huirthUpdateDataSetRemoveContentsEntryPayload, any>;
  huirthUpdateDataSetSystemInstructions: Quality<huirthState, huirthUpdateDataSetSystemInstructionsPayload>;
  huirthUpdateDataSetAddSystemInstructions: Quality<huirthState, huirthUpdateDataSetAddSystemInstructionsPayload, any>;
  huirthUpdateDataSetRemoveSystemInstructions: Quality<huirthState, huirthUpdateDataSetRemoveSystemInstructionsPayload, any>;
  huirthUpdateDataSetPrompt: Quality<huirthState, huirthUpdateDataSetSystemInstructionsPayload, any>;
  huirthUpdateProjectStatus: Quality<huirthState, huirthUpdateProjectStatusPayload, any>;
  huirthUpdateDataSetSelection: Quality<huirthState, huirthUpdateDataSetSelectionPayload, any>;
  huirthUpdateParsedProjectDataSet: Quality<huirthState, huirthUpdateParsedProjectDataSetPayload, any>;
  huirthUpdateProjectStatusToSaved: Quality<huirthState, huirthUpdateProjectStatusToSavedPayload, any>;
  huirthNewDataSetEntry: Quality<huirthState, huirthNewDataSetEntryPayload, any>;
  huirthNewDataSet: Quality<huirthState, void, any>;
  huirthNewDPOEntry: Quality<huirthState, void, any>;
  huirthRemoveDataSetSelection: Quality<huirthState, void, any>;
  huirthTriggerMinusCountingStrategy: Quality<huirthState, void, any>;
  huirthTriggerPlusCountingStrategy: Quality<huirthState, void, any>;
  huirthTriggerRandomCountingStrategy: Quality<huirthState, void, any>;
  huirthTriggerInstallGitRepository: Quality<huirthState, huirthTriggerInstallGitRepositoryPayload, any>;
  huirthToggleSidebar: Quality<huirthState, void, any>;
  huirthSetPossibleProject: Quality<huirthState, void, any>;
  huirthFilterTriggerInstallGitRepository: Quality<huirthState, void, any>;
  huirthSetDataSet: Quality<huirthState, huirthSetDataSetPayload, any>;
  huirthSetSelectedTransformation: Quality<huirthState, void, any>;
  huirthSetTrainingDataPage: Quality<huirthState, HuirthSetTrainingDataPagePayload, any>;
  huirthFilterTrainingDataPage: Quality<huirthState, HuirthFilterTrainingDataPagePayload, any>;
  huirthSetTrainingDataInitialized: Quality<huirthState, void, any>;
  huirthSendAddTrainingPageStrategy: Quality<huirthState, HuirthSendTriggerAddTrainingPageStrategy, any>;
  huirthTriggerAddTrainingDataPage: Quality<huirthState, HuirthTriggerAddTrainingDataPage, any>;
  huirthSendRemoveAddTrainingPageStrategy: Quality<huirthState, HuirthSendTriggerRemoveAddTrainingPageStrategy, any>;
  huirthTriggerRemoveAddTrainingDataPage: Quality<huirthState, HuirthTriggerRemoveAddTrainingDataPage, any>;
};

export type HuirthDeck = {
  huirth: Concept<huirthState, Qualities>;
} & UserInterfaceDeck &
  MuxiumDeck &
  HtmlDeck &
  CounterDeck;
export type HuirthPrinciple = PrincipleFunction<typeof qualities, HuirthDeck, huirthState>;
export const createHuirthConcept = () => {
  const principles = [huirthDialogPrinciple, huirthTrainingDataPagePrinciple];
  // This is temporary, the complete flow would allow for all server logic to remain on the server.
  return muxifyConcepts([createCounterConcept()], createConcept(huirthName, createHuirthState(), qualities, principles, []));
};
/*#>*/
