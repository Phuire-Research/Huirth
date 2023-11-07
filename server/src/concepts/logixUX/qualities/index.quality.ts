/* eslint-disable max-len */
import {
  Action,
  ActionType,
  Method,
  MethodCreator,
  axiumConcludeType,
  createAction,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess
} from 'stratimux';

import { Subject, map } from 'rxjs';
import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const logixUXIndexType: ActionType = 'create userInterface for Index';
export const logixUXIndex = prepareActionCreator(logixUXIndexType);

const createIndexMethodCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    map((action: Action) => {
      if (action.strategy) {
        return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
          selectors: [],
          action: logixUXIndex(),
          html: /*html*/`
<section class="flex flex-col min-h-screen bg-black text-white bg-center bg-blend-overlay md:bg-fixed bg-black/5">
  <div class="flex items-center h-16">
    <!-- Navbar Container -->
    <div class="mx-auto relative px-5 w-full flex items-center justify-end">
      <!-- Navbar Logo -->
      <div class="text-4xl font-light uppercase absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-10">
      </div>
      <img class="w-16 absolute top-0 left-4" src="/static/PHUIRE.png" alt="logixUX">
      <!-- Navbar Menu -->
      <nav class="flex flex-row gap-2">
        <a class="text-2xl flex-1 text-black/60 hover:text-black" href="https://github.com/Phuire-Research">GITHUB <i class="text-3xl fa-brands fa-github"></i></a>
      </nav>
    </div>
  </div>
  <div class="flex-1 flex items-center">
    <div class="flex flex-col items-center text-center mx-auto">
      <img class="flex-none" src="/static/logixUX.png" alt="logixUX">
    </div>
  </div>
</section>
        `
        }));
      }
      return createAction(axiumConcludeType);
    })
  );
  return [
    logMethod,
    logSubject
  ];
};

export const logixUXIndexQuality = createQuality(
  logixUXIndexType,
  defaultReducer,
  createIndexMethodCreator,
);
