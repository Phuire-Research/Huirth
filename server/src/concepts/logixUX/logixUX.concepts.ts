import { createConcept, Concept } from 'stratimux';
import { logixUXIndexQuality } from './qualities/index.quality';
import { logixUXErrorQuality } from './qualities/error.quality';
import { logixUXHeadQuality } from './qualities/head.quality';
import { logixUXStyleQuality } from './qualities/style.quality';
import { logixUXFooterQuality } from './qualities/footer.quality';

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
      logixUXIndexQuality,
      logixUXErrorQuality
    ],
    [],
    []
  );
};
