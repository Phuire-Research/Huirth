import { createConcept, Concept, unifyConcepts, createCounterConcept, PrincipleFunction, Quality } from 'stratimux';
import { logixUXPushToServerSaveTrainingDataQuality } from '../logixUX/qualities/pushToServerSaveTraining.quality';
import { LogixUXState } from '../logixUX/logixUX.concept';

export const logixUXServerName = 'logixUXServer';
export type LogixUXServerState = {
  //
} & LogixUXState;

export const createLogixUXServerConcept = (): Concept =>  {
  const principles: PrincipleFunction[] = [];
  const qualities: Quality[] = [
    logixUXPushToServerSaveTrainingDataQuality
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
