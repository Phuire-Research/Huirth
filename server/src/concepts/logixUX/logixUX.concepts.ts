import { createConcept, Concept } from 'stratimux';
import { logixUXErrorQuality } from './qualities/error.quality';
import { logixUXHeadQuality } from './qualities/head.quality';
import { logixUXStyleQuality } from './qualities/style.quality';
import { logixUXFooterQuality } from './qualities/footer.quality';
import { logixUXIndexHeroQuality } from './qualities/index/indexHero.quality';
import { logixUXIndexDialogBeginQuality } from './qualities/index/dialog/indexDialogBegin.quality';
import { logixUXIndexDialogContentQuality } from './qualities/index/dialog/indexDialogContent.quality';
import { logixUXIndexDialogEndQuality } from './qualities/index/dialog/indexDialogEnd.quality';
import { logixUXTriggerCountingStrategyQuality } from './qualities/triggerCounterStrategy.quality';

export const logixUXName = 'logixUX';
export type UserInterfaceLogixUXState = {
  mock: number
};

const createLogixUXState = (): UserInterfaceLogixUXState => {
  return {
    mock: 0,
  };
};

export const createLogixUXConcept = (): Concept =>  {
  return createConcept(
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
      logixUXTriggerCountingStrategyQuality
    ],
    [],
    []
  );
};
