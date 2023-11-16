import { createConcept, Concept, unifyConcepts, createCounterConcept, PrincipleFunction, Quality } from 'stratimux';
import { logixUXErrorQuality } from './qualities/components/error/error.quality';
import { logixUXHeadQuality } from './qualities/components/head.quality';
import { logixUXStyleQuality } from './qualities/components/style.quality';
import { logixUXFooterQuality } from './qualities/components/footer.quality';
import { logixUXIndexHeroQuality } from './qualities/components/hero/indexHero.quality';
import { logixUXIndexDialogBeginQuality } from './qualities/components/dialog/indexDialogBegin.quality';
import { logixUXIndexDialogContentQuality } from './qualities/components/dialog/indexDialogContent.quality';
import { logixUXIndexDialogEndQuality } from './qualities/components/dialog/indexDialogEnd.quality';
import { logixUXAppendAxiumDialogQuality } from './qualities/appendAxiumDialog.quality';
import { logixUXDialogPrinciple } from './logixUX.principle';
import { BrandState } from '../../model/userInterface';
import { logixUXIndexPageStrategy } from './strategies/pages/indexPage.strategy';
import { logixUXErrorPageStrategy } from './strategies/pages/errorPage.strategy';
import { logixUXIndexDPOBeginQuality } from './qualities/components/DPO/DPOBegin.quality';
import { logixUXIndexDPOContentQuality } from './qualities/components/DPO/DPOContent.quality';
import { logixUXIndexDPOEndQuality } from './qualities/components/DPO/DPOEnd.quality';
import { logixUXUpdateFromPromptPayloadQuality } from './qualities/updateFromPromptPayload.quality';
import { logixUXUpdateFromChosenPayloadQuality } from './qualities/updateFromChosenPayload.quality';
import { logixUXUpdateFromRejectedPayloadQuality } from './qualities/updateFromRejectedPayload.quality';
import { Active_DPO, TrainingData, generateDPOTrainingData, generateDefaultTrainingData } from './logixUX.model';
import { logixUXNewDataSetEntryQuality } from './qualities/newDataSetEntry.quality';
import { logixUXTriggerMinusCountingStrategyQuality } from './qualities/triggerMinusCounterStrategy.quality';
import { logixUXTriggerPlusCountingStrategyQuality } from './qualities/triggerPlusCounterStrategy.quality';
import { logixUXTriggerRandomCountingStrategyQuality } from './qualities/triggerRandomCounterStrategy.quality';
import { logixUXDataManagerPageStrategy } from './strategies/pages/dataManagerPage.strategy';

export const logixUXName = 'logixUX';
export type LogixUXState = {
  mock: number;
  dialog: string;
  trainingData: TrainingData;
  activeDPO: Active_DPO[];
} & BrandState;

const createLogixUXState = (): LogixUXState => {
  return {
    mock: 0,
    dialog: '',
    trainingData: generateDefaultTrainingData(),
    activeDPO: [generateDPOTrainingData()],
    pageStrategies: [logixUXIndexPageStrategy, logixUXDataManagerPageStrategy, logixUXErrorPageStrategy],
  };
};

export const createLogixUXConcept = (): Concept => {
  const principles: PrincipleFunction[] = [logixUXDialogPrinciple];
  const qualities: Quality[] = [
    logixUXHeadQuality,
    logixUXStyleQuality,
    logixUXFooterQuality,
    logixUXIndexHeroQuality,
    logixUXIndexDialogBeginQuality,
    logixUXIndexDialogContentQuality,
    logixUXIndexDialogEndQuality,
    logixUXErrorQuality,
    logixUXAppendAxiumDialogQuality,
    logixUXIndexDPOBeginQuality,
    logixUXIndexDPOContentQuality,
    logixUXIndexDPOEndQuality,
    logixUXUpdateFromPromptPayloadQuality,
    logixUXUpdateFromChosenPayloadQuality,
    logixUXUpdateFromRejectedPayloadQuality,
    logixUXNewDataSetEntryQuality,
    logixUXTriggerMinusCountingStrategyQuality,
    logixUXTriggerPlusCountingStrategyQuality,
    logixUXTriggerRandomCountingStrategyQuality,
  ];
  // This is temporary, the complete flow would allow for all server logic to remain on the server.
  return unifyConcepts([createCounterConcept()], createConcept(logixUXName, createLogixUXState(), qualities, principles, []));
};
