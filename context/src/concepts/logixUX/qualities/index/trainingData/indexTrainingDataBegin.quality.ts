/* eslint-disable max-len */
import { ActionType, MethodCreator, createMethod, createQuality, defaultReducer, prepareActionCreator, strategySuccess } from 'stratimux';

import { userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXIndexTrainingDataBeginType: ActionType = 'create userInterface for IndexTrainingDataBegin';
export const logixUXIndexTrainingDataBegin = prepareActionCreator(logixUXIndexTrainingDataBeginType);

const createIndexTrainingDataBeginMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const id = '#beginTrainingDataID';
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          action: logixUXIndexTrainingDataBegin(),
          html: /*html*/ `
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center bg-gradient-to-br from-60% from-black to-transparent to-black min-h-screen text-white">
    <div class ="flex-1 mb-12 max-w-3xl m-10 pt-10 pb-10">
      <h1 class="text-3xl text-center p-4">DPO Training Set</h1>
`,
        })
      );
    }
    return action;
  });

export const logixUXIndexTrainingDataBeginQuality = createQuality(
  logixUXIndexTrainingDataBeginType,
  defaultReducer,
  createIndexTrainingDataBeginMethodCreator
);
