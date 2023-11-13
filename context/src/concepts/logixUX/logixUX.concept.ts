import { createConcept, Concept, unifyConcepts, createCounterConcept } from 'stratimux';
import { logixUXErrorQuality } from './qualities/error.quality';
import { logixUXHeadQuality } from './qualities/head.quality';
import { logixUXStyleQuality } from './qualities/style.quality';
import { logixUXFooterQuality } from './qualities/footer.quality';
import { logixUXIndexHeroQuality } from './qualities/index/indexHero.quality';
import { logixUXIndexDialogBeginQuality } from './qualities/index/dialog/indexDialogBegin.quality';
import { logixUXIndexDialogContentQuality } from './qualities/index/dialog/indexDialogContent.quality';
import { logixUXIndexDialogEndQuality } from './qualities/index/dialog/indexDialogEnd.quality';
import { logixUXTriggerCountingStrategyQuality } from './qualities/triggerCounterStrategy.quality';
import { logixUXAppendAxiumDialogQuality } from './qualities/appendAxiumDialog.quality';
import { logixUXDialogPrinciple } from './logixUX.principle';
import { BrandState } from '../../model/userInterface';
import { logixUXIndexPageStrategy } from './strategies/indexPage.strategy';
import { logixUXErrorPageStrategy } from './strategies/errorPage.strategy';
import { DPO_DataSet } from '../../model/logixUX';
import { logixUXIndexTrainingDataBeginQuality } from './qualities/index/trainingData/indexTrainingDataBegin.quality';
import { logixUXIndexTrainingDataContentQuality } from './qualities/index/trainingData/indexTrainingDataContent.quality';
import { logixUXIndexTrainingDataEndQuality } from './qualities/index/trainingData/indexTrainingDataEnd.quality';
import { logixUXUpdateFromPayloadQuality } from './qualities/updateFromPayload.quality';

export const logixUXName = 'logixUX';
export type LogixUXState = {
  mock: number;
  dialog: string;
  trainingData: DPO_DataSet;
} & BrandState;

const createLogixUXState = (): LogixUXState => {
  return {
    mock: 0,
    dialog: '',
    trainingData: {},
    pageStrategies: [logixUXIndexPageStrategy, logixUXErrorPageStrategy],
  };
};

export const createLogixUXConcept = (): Concept => {
  return unifyConcepts(
    [createCounterConcept()],
    createConcept(
      logixUXName,
      createLogixUXState(),
      [
        logixUXHeadQuality,
        logixUXStyleQuality,
        logixUXFooterQuality,
        logixUXIndexHeroQuality,
        logixUXIndexDialogBeginQuality,
        logixUXIndexDialogContentQuality,
        logixUXIndexDialogEndQuality,
        logixUXErrorQuality,
        logixUXTriggerCountingStrategyQuality,
        logixUXAppendAxiumDialogQuality,
        logixUXIndexTrainingDataBeginQuality,
        logixUXIndexTrainingDataContentQuality,
        logixUXIndexTrainingDataEndQuality,
        logixUXUpdateFromPayloadQuality,
      ],
      [logixUXDialogPrinciple],
      []
    )
  );
};
