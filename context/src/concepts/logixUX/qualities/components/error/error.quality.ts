/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the Error Page Component.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  Action,
  ActionType,
  MethodCreator,
  axiumConcludeType,
  createAction,
  createMethod,
  createQuality,
  defaultReducer,
  strategySuccess,
} from 'stratimux';
import {
  prepareActionComponentCreator,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const logixUXErrorType: ActionType = 'Create logixUX Error Composition';
export const logixUXError = prepareActionComponentCreator(logixUXErrorType);

const createErrorMethodCreator: MethodCreator = () =>
  createMethod((action: Action) => {
    const payload = selectComponentPayload(action);
    if (action.strategy) {
      const id = '#errorID';
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id,
          boundSelectors: [],
          universal: false,
          action: logixUXError(payload),
          html: /*html*/ `
<section id='${id}' class="flex flex-col min-h-screen bg-black text-white bg-center bg-blend-overlay md:bg-fixed bg-black/5">
  <div class="flex-1 flex items-center">
    <div class="flex flex-col items-center text-center mx-auto">
      <h1 class="text-8xl text-black">404</h1>
    </div>
  </div>
</section>
`,
        })
      );
    }
    return createAction(axiumConcludeType);
  });

export const logixUXErrorQuality = createQuality(logixUXErrorType, defaultReducer, createErrorMethodCreator);
