/*<$
For the graph programming framework Stratimux generate a Brand Concept called huirth that will act as a Sidekick Application for the Stratimux Framework.
$>*/
/*<#*/
import { createConcept, Concept, unifyConcepts, createCounterConcept, PrincipleFunction, Quality } from 'stratimux';
import { BrandState } from '../../model/userInterface';
import { huirthErrorQuality } from './qualities/components/error/error.quality';
import { huirthHeadQuality } from './qualities/components/head.quality';
import { huirthStyleQuality } from './qualities/components/style.quality';
import { huirthFooterQuality } from './qualities/components/footer.quality';
import { huirthIndexHeroQuality } from './qualities/components/hero/indexHero.quality';
import { huirthIndexDialogBeginQuality } from './qualities/components/dialog/indexDialogBegin.quality';
import { huirthIndexDialogContentQuality } from './qualities/components/dialog/indexDialogContent.quality';
import { huirthIndexDialogEndQuality } from './qualities/components/dialog/indexDialogEnd.quality';
import { huirthAppendAxiumDialogQuality } from './qualities/appendAxiumDialog.quality';
import { huirthDialogPrinciple } from './huirth.principle';
import { huirthTrainingDataPagePrinciple } from './huirth.trainingDataPage.principle';
import { huirthIndexPageStrategy } from './strategies/pages/indexPage.strategy';
import { huirthErrorPageStrategy } from './strategies/pages/errorPage.strategy';
import { huirthIndexDPOBeginQuality } from './qualities/components/DPO/DPOBegin.quality';
import { huirthIndexDPOContentQuality } from './qualities/components/DPO/DPOContent.quality';
import { huirthIndexDPOEndQuality } from './qualities/components/DPO/DPOEnd.quality';
import { huirthUpdateFromPromptPayloadQuality } from './qualities/updateFromPromptPayload.quality';
import { huirthUpdateFromChosenPayloadQuality } from './qualities/updateFromChosenPayload.quality';
import { huirthUpdateFromRejectedPayloadQuality } from './qualities/updateFromRejectedPayload.quality';
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
import { huirthNewDataSetEntryQuality } from './qualities/newDataSetEntry.quality';
import { huirthTriggerMinusCountingStrategyQuality } from './qualities/triggerMinusCounterStrategy.quality';
import { huirthTriggerPlusCountingStrategyQuality } from './qualities/triggerPlusCounterStrategy.quality';
import { huirthTriggerRandomCountingStrategyQuality } from './qualities/triggerRandomCounterStrategy.quality';
import { huirthDataManagerPageStrategy } from './strategies/pages/dataManagerPage.strategy';
import { huirthDataManagerBeginQuality } from './qualities/components/dataManager/dataManagerBegin.quality';
import { huirthDataManagerContentQuality } from './qualities/components/dataManager/dataManagerContent.quality';
import { huirthDataManagerEndQuality } from './qualities/components/dataManager/dataManagerEnd.quality';
import { huirthSideBarBeginQuality } from './qualities/components/sideBar/sideBarBegin.quality';
import { huirthSideBarContentQuality } from './qualities/components/sideBar/sideBarContent.quality';
import { huirthSideBarEndQuality } from './qualities/components/sideBar/sideBarEnd.quality';
import { huirthToggleSidebarQuality } from './qualities/toggleSidebar.quality';
import { huirthNewDPOEntryQuality } from './qualities/newDPOEntry.quality';
import { huirthNewDataSetQuality } from './qualities/newDataSet.quality';
import { huirthUpdateDataSetNameQuality } from './qualities/updateDataSetName.quality';
import { huirthDataSetBeginQuality } from './qualities/components/dataSet/dataSetBegin.quality';
import { huirthDataSetEndQuality } from './qualities/components/dataSet/dataSetEnd.quality';
import { huirthDataSetContentQuality } from './qualities/components/dataSet/dataSetContent.quality';
import { huirthUpdateDataSetContentsQuality } from './qualities/updateDataSetContents.quality';
import { huirthUpdateDataSetPromptQuality } from './qualities/updateDataSetPrompt.quality';
import { huirthUpdateProjectStatusQuality } from './qualities/updateProjectToStatus.quality';
import { huirthTriggerInstallGitRepositoryQuality } from './qualities/triggerInstallGitRepository.quality';
import { huirthUpdateParsedProjectDataSetQuality } from './qualities/updateParsedProjectDataSet.quality';
import { huirthUpdateDataSetSelectionQuality } from './qualities/updateDataSetSelection.quality';
import { huirthSendTriggerParseRepositoryStrategyQuality } from './qualities/sendTriggerParseRepositoryStrategy.quality';
import { huirthSendTriggerSaveDataSetSelectionStrategyQuality } from './qualities/sendTriggerSaveDataSetSelectionStrategy.quality';
import { huirthUpdateProjectStatusToSavedQuality } from './qualities/updateProjectToSaved.quality';
import { huirthRemoveDataSetSelectionQuality } from './qualities/removeDataSetSelection.quality';
import { huirthSendTriggerDeleteDataSetsStrategyQuality } from './qualities/sendTriggerDeleteDataSetsStrategy.quality';
import { huirthSetPossibleProjectQuality } from './qualities/setPossibleProject.quality';
import { huirthFilterTriggerInstallGitRepositoryQuality } from './qualities/filterTriggerInstallGitRepository.quality';
import { huirthSetDataSetQuality } from './qualities/setDataSet.quality';
import { huirthSetSelectedTransformationQuality } from './qualities/setSelectedTransformation.quality';
import { huirthSendTriggerSelectedTransformationStrategyQuality } from './qualities/sendTriggerSelectedTransformationStrategy.quality';
import { huirthClearDataSetSelectionQuality } from './qualities/clearDataSetSelection.quality';

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
  trainingData: TrainingData;
  trainingDataCounter: number;
  activeDPO: Active_DPO[];
} & BrandState;

const createHuirthState = (): huirthState => {
  return {
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
    trainingData: generateDefaultTrainingData(),
    trainingDataCounter: -1,
    activeDPO: [generateDPOTrainingData()],
    pageStrategies: [huirthIndexPageStrategy, huirthDataManagerPageStrategy, huirthErrorPageStrategy],
  };
};

export const createHuirthConcept = (): Concept => {
  const principles: PrincipleFunction[] = [huirthDialogPrinciple, huirthTrainingDataPagePrinciple];
  const qualities: Quality[] = [
    huirthHeadQuality,
    huirthStyleQuality,
    huirthFooterQuality,
    huirthSideBarBeginQuality,
    huirthSideBarContentQuality,
    huirthSideBarEndQuality,
    huirthIndexHeroQuality,
    huirthIndexDialogBeginQuality,
    huirthIndexDialogContentQuality,
    huirthIndexDialogEndQuality,
    huirthErrorQuality,
    huirthAppendAxiumDialogQuality,
    huirthIndexDPOBeginQuality,
    huirthIndexDPOContentQuality,
    huirthIndexDPOEndQuality,
    huirthClearDataSetSelectionQuality,
    huirthDataManagerBeginQuality,
    huirthDataManagerContentQuality,
    huirthDataManagerEndQuality,
    huirthDataSetBeginQuality,
    huirthDataSetContentQuality,
    huirthDataSetEndQuality,
    huirthSendTriggerParseRepositoryStrategyQuality,
    huirthSendTriggerSaveDataSetSelectionStrategyQuality,
    huirthSendTriggerDeleteDataSetsStrategyQuality,
    huirthSendTriggerSelectedTransformationStrategyQuality,
    huirthUpdateFromPromptPayloadQuality,
    huirthUpdateFromChosenPayloadQuality,
    huirthUpdateFromRejectedPayloadQuality,
    huirthUpdateDataSetNameQuality,
    huirthUpdateDataSetContentsQuality,
    huirthUpdateDataSetPromptQuality,
    huirthUpdateProjectStatusQuality,
    huirthUpdateDataSetSelectionQuality,
    huirthUpdateParsedProjectDataSetQuality,
    huirthUpdateProjectStatusToSavedQuality,
    huirthNewDataSetEntryQuality,
    huirthNewDataSetQuality,
    huirthNewDPOEntryQuality,
    huirthRemoveDataSetSelectionQuality,
    huirthTriggerMinusCountingStrategyQuality,
    huirthTriggerPlusCountingStrategyQuality,
    huirthTriggerRandomCountingStrategyQuality,
    huirthTriggerInstallGitRepositoryQuality,
    huirthToggleSidebarQuality,
    huirthSetPossibleProjectQuality,
    huirthFilterTriggerInstallGitRepositoryQuality,
    huirthSetDataSetQuality,
    huirthSetSelectedTransformationQuality,
  ];
  // This is temporary, the complete flow would allow for all server logic to remain on the server.
  return unifyConcepts([createCounterConcept()], createConcept(huirthName, createHuirthState(), qualities, principles, []));
};
/*#>*/
