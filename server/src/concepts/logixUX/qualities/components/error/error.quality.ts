/* eslint-disable max-len */
import {
  Action,
  ActionType,
  Method,
  MethodCreator,
  axiumConcludeType,
  createAction,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess
} from 'stratimux';

import { Subject, map } from 'rxjs';
import { prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXErrorType: ActionType = 'Create logixUX Error Composition';
export const logixUXError = prepareActionComponentCreator(logixUXErrorType);

const createErrorMethodCreator: MethodCreator = () =>
  createMethod((action: Action) => {
    const payload = selectComponentPayload(action);
    if (action.strategy) {
      const id = '#errorID';
      return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
        id,
        boundSelectors: [],
        action: logixUXError(payload),
        html: /*html*/`
<section id='${id}' class="flex flex-col min-h-screen bg-black text-white bg-center bg-blend-overlay md:bg-fixed bg-black/5">
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
      <h1 class="text-8xl text-black">404</h1>
    </div>
  </div>
</section>
`
      }));
    }
    return createAction(axiumConcludeType);
  });

export const logixUXErrorQuality = createQuality(
  logixUXErrorType,
  defaultReducer,
  createErrorMethodCreator,
);
