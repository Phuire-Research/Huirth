/*<$
For the graph programming framework Stratimux generate a Brand Concept called huirth that will act as a Sidekick Application for the Stratimux Framework.
$>*/
/*<#*/
import { createConcept, Concept, muxifyConcepts, createCounterConcept, PrincipleFunction, Quality, AxiumDeck } from '@phuire/stratimux';
import { BrandState } from '../../model/userInterface';
import { huirthError } from './qualities/components/error/error.quality';
import { huirthHead } from './qualities/components/head.quality';
import { huirthStyle } from './qualities/components/style.quality';
import { huirthFooter } from './qualities/components/footer.quality';
import { huirthIndexHero } from './qualities/components/hero/indexHero.quality';
import { huirthIndexDialogBegin } from './qualities/components/dialog/indexDialogBegin.quality';
import { huirthIndexDialogContent } from './qualities/components/dialog/indexDialogContent.quality';
import { huirthIndexDialogEnd } from './qualities/components/dialog/indexDialogEnd.quality';
import { huirthAppendAxiumDialog } from './qualities/appendAxiumDialog.quality';
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
  huirthVerboseAddingStrategySelect,
  huirthVerboseAdditionAndSubtractionStrategySelect,
  huirthVerboseSubtractionStrategySelect,
} from './huirth.model';
import { huirthNewDataSetEntry } from './qualities/newDataSetEntry.quality';
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
import { huirthUpdateDataSetName } from './qualities/updateDataSetName.quality';
import { huirthDataSetBegin } from './qualities/components/dataSet/dataSetBegin.quality';
import { huirthDataSetEnd } from './qualities/components/dataSet/dataSetEnd.quality';
import { huirthDataSetContent } from './qualities/components/dataSet/dataSetContent.quality';
import { huirthUpdateDataSetContents } from './qualities/updateDataSetContents.quality';
import { huirthUpdateDataSetPrompt } from './qualities/updateDataSetPrompt.quality';
import { huirthUpdateProjectStatus } from './qualities/updateProjectToStatus.quality';
import { huirthTriggerInstallGitRepository } from './qualities/triggerInstallGitRepository.quality';
import { huirthUpdateParsedProjectDataSet } from './qualities/updateParsedProjectDataSet.quality';
import { huirthUpdateDataSetSelection } from './qualities/updateDataSetSelection.quality';
import { huirthSendTriggerParseRepositoryStrategy } from './qualities/sendTriggerParseRepositoryStrategy.quality';
import { huirthSendTriggerSaveDataSetSelectionStrategy } from './qualities/sendTriggerSaveDataSetSelectionStrategy.quality';
import { huirthUpdateProjectStatusToSaved } from './qualities/updateProjectToSaved.quality';
import { huirthRemoveDataSetSelection } from './qualities/removeDataSetSelection.quality';
import { huirthSendTriggerDeleteDataSetsStrategy } from './qualities/sendTriggerDeleteDataSetsStrategy.quality';
import { huirthSetPossibleProject } from './qualities/setPossibleProject.quality';
import { huirthFilterTriggerInstallGitRepository } from './qualities/filterTriggerInstallGitRepository.quality';
import { huirthSetDataSet } from './qualities/setDataSet.quality';
import { huirthSetSelectedTransformation } from './qualities/setSelectedTransformation.quality';
import { huirthSendTriggerSelectedTransformationStrategy } from './qualities/sendTriggerSelectedTransformationStrategy.quality';
import { huirthClearDataSetSelection } from './qualities/clearDataSetSelection.quality';
import { huirthSetTrainingDataPage } from './qualities/setTrainingDataPage.quality';
import { huirthFilterTrainingDataPage } from './qualities/filterTrainingDataPage.quality';
import { huirthSetTrainingDataInitialized } from './qualities/setTrainingDataInitialized.quality';
import { huirthTriggerAddTrainingDataPage } from './qualities/triggerAddTrainingDataPageStrategy.quality';
import { huirthSendAddTrainingPageStrategy } from './qualities/sendTriggerAddTrainingPageStrategy.quality';
import { huirthSendRemoveAddTrainingPageStrategy } from './qualities/sendTriggerRemoveAddTrainingPageStrategy.quality';
import { huirthTriggerRemoveAddTrainingDataPage } from './qualities/triggerRemoveAddTrainingDataPageStrategy.quality';
import { createUserInterfaceState, UserInterfaceState } from '../userInterface/userInterface.concept';

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
} & BrandState & UserInterfaceState;

const createHuirthState = (): huirthState => {
  return {
    ...createUserInterfaceState([]),
    mock: 0,
    dialog: '',
    transformationStrategies: [
      huirthVerboseAddingStrategySelect,
      huirthVerboseSubtractionStrategySelect,
      huirthVerboseAdditionAndSubtractionStrategySelect,
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
  huirthAppendAxiumDialog,
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
  huirthSendTriggerParseRepositoryStrategy,
  huirthSendTriggerSaveDataSetSelectionStrategy,
  huirthSendTriggerDeleteDataSetsStrategy,
  huirthSendTriggerSelectedTransformationStrategy,
  huirthUpdateFromPromptPayload,
  huirthUpdateFromChosenPayload,
  huirthUpdateFromRejectedPayload,
  huirthUpdateDataSetName,
  huirthUpdateDataSetContents,
  huirthUpdateDataSetPrompt,
  huirthUpdateProjectStatus,
  huirthUpdateDataSetSelection,
  huirthUpdateParsedProjectDataSet,
  huirthUpdateProjectStatusToSaved,
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
export type HuirthDeck = {
  huirth: Concept<huirthState, typeof qualities>;
};
export type HuirthPrinciple = PrincipleFunction<typeof qualities, AxiumDeck & HuirthDeck, huirthState>;
export const createHuirthConcept = () => {
  const principles = [huirthDialogPrinciple, huirthTrainingDataPagePrinciple];
  // This is temporary, the complete flow would allow for all server logic to remain on the server.
  return muxifyConcepts([createCounterConcept()], createConcept(huirthName, createHuirthState(), qualities, principles, []));
};
/*#>*/
