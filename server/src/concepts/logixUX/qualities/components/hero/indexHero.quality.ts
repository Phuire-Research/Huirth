/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality for the Hero Section Component.
$>*/
/*<#*/
/* eslint-disable max-len */
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  nullReducer,
  strategySuccess
} from 'stratimux';

import { prepareActionComponentCreator, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../../model/userInterface';

export const logixUXIndexHeroType: ActionType = 'create userInterface for IndexHero';
export const logixUXIndexHero = prepareActionComponentCreator(logixUXIndexHeroType);

const createIndexHeroMethodCreator: MethodCreator = () => createMethod(action => {
  const payload = selectComponentPayload(action);
  const id = '#heroId';
  if (action.strategy) {
    return strategySuccess(action.strategy, userInterface_appendCompositionToPage(action.strategy, {
      id,
      boundSelectors: [],
      universal: false,
      action: logixUXIndexHero(payload),
      html: /*html*/`
<section id='${id}' class="flex flex-col min-h-screen bg-black text-white bg-center bg-blend-overlay md:bg-fixed bg-black/5">
  <div class="flex-1 flex items-center">
    <div class="flex flex-col items-center text-center mx-auto">
      <img class="flex-none" src="/static/logixUX.png" alt="logixUX">
    </div>
  </div>
</section>
        `
    }));
  }
  return action;
});

export const logixUXIndexHeroQuality = createQuality(
  logixUXIndexHeroType,
  nullReducer,
  createIndexHeroMethodCreator,
);
/*#>*/