/* eslint-disable max-len */
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess
} from 'stratimux';

import { userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXIndexDialogBeginType: ActionType = 'create userInterface for IndexDialogBegin';
export const logixUXIndexDialogBegin = prepareActionCreator(logixUXIndexDialogBeginType);

const createIndexDialogBeginMethodCreator: MethodCreator = () => createMethod(action => {
  const id = '#dialogBeginID';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
      id,
      boundSelectors: [],
      action: logixUXIndexDialogBegin(),
      html: /*html*/`
<div id='${id}' class="carbon-fiber">
  <section class="flex flex-col items-center bg-gradient-to-br from-60% from-black to-transparent to-black min-h-screen text-white">
    <div class ="flex-1 mb-12 max-w-3xl m-10 pt-10 pb-10">
      <h1 class="text-3xl text-center">Stratimux Dialog Output</h1>
`
    }));
  }
  return action;
});

export const logixUXIndexDialogBeginQuality = createQuality(
  logixUXIndexDialogBeginType,
  defaultReducer,
  createIndexDialogBeginMethodCreator,
);
