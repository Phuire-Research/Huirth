/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the Hero Section Component.
$>*/
/*<#*/
/* eslint-disable max-len */
import { createMethod, nullReducer, strategySuccess } from 'stratimux';

import {
  createQualitySetComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage,
} from '../../../../../model/userInterface';

export const [logixUXIndexHero, logixUXIndexHeroType, logixUXIndexHeroQuality] = createQualitySetComponent({
  type: 'create userInterface for IndexHero',
  reducer: nullReducer,
  componentCreator: (act) =>
    createMethod((action) => {
      const payload = selectComponentPayload(action);
      const id = '#heroId';
      if (action.strategy) {
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
      <img class="flex-none" src="/static/logixUX.png" alt="logixUX">
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
