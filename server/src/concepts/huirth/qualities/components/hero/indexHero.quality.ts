/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a User Interface Component quality for the Hero Section Component.
$>*/
/*<#*/
/* eslint-disable max-len */
import { createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import {
  createQualityCardComponent,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const huirthIndexHero = createQualityCardComponent({
  type: 'create userInterface for IndexHero',
  reducer: nullReducer,
  componentCreator:
    createMethod((action) => {
      const id = '#heroId';
      if (action.strategy) {
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id,
            boundSelectors: [],
            universal: false,
            action,
            html: /*html*/ `
<section id='${id}' class="flex flex-col min-h-screen bg-black text-white bg-center bg-blend-overlay md:bg-fixed bg-black/5">
  <div class="flex-1 flex items-center">
    <div class="flex flex-col items-center text-center mx-auto">
      <img class="flex-none" src="/static/Huirth.png" alt="huirth">
    </div>
  </div>
</section>
        `,
          })
        );
      }
      return action;
    }),
});
/*#>*/
