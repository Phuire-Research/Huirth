/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality that will add a Hello World composition for a User Interface Concept and a supplied page composition.
$>*/
/*<#*/
import { Action, axiumConcludeType, createAction, createMethod, nullReducer, strategySuccess } from '@phuire/stratimux';

import { createQualityCardComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const [htmlHelloWorld, htmlHelloWorldType, htmlHelloWorldQuality] = createQualityCardComponent({
  type: 'Html create hello world composition',
  reducer: nullReducer,
  componentCreator: (act) =>
    createMethod((action: Action) => {
      const payload = selectComponentPayload(action);
      if (action.strategy) {
        const helloWorldId = '#helloWorld';
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            id: helloWorldId,
            boundSelectors: [],
            universal: false,
            action: act(payload),
            html: /*html*/ `<h1 id=${helloWorldId}>Hello World</h1>`,
          })
        );
      }
      return createAction(axiumConcludeType);
    }),
});
/*#>*/
