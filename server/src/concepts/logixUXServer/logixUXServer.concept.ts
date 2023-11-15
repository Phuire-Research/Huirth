import { createConcept, Concept, unifyConcepts, createCounterConcept, PrincipleFunction, Quality } from 'stratimux';
import { LogixUXState } from '../logixUX/logixUX.concept';
import { logixUXServerTriggerSaveTrainingDataStrategyQuality } from './qualities/triggerSaveTrainingDataStrategy.quality';
// import { logixUXServerPrinciple } from './logixUXServer.principle';

export const logixUXServerName = 'logixUXServer';
export type LogixUXServerState = {
  //
} & LogixUXState;

export const createLogixUXServerConcept = (): Concept =>  {
  const principles: PrincipleFunction[] = [
    // logixUXServerPrinciple
  ];
  const qualities: Quality[] = [
    logixUXServerTriggerSaveTrainingDataStrategyQuality
  ];
  // This is temporary, the complete flow would allow for all server logic to remain on the server.
  return unifyConcepts(
    [
    ],
    createConcept(
      logixUXServerName,
      {},
      qualities,
      principles,
      []
    ));
};
