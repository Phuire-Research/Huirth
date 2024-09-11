/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the Error Page Component.
$>*/
/*<#*/
/* eslint-disable max-len */
import { Action, axiumConcludeType, createAction, createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';
import {
  createQualityCardComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const [huirthError, huirthErrorType, huirthErrorQuality] = createQualityCardComponent({
  type: 'Create huirth Error Composition',
  reducer: nullReducer,
  componentCreator: (act) =>
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
            action: act(payload),
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
    }),
});
/*#>*/
