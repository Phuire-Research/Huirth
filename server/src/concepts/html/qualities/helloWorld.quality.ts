/*<$*/
// PROMPT: For the framework Stratimux and Html Concept, generate a quality that will add a Hello World composition for a User Interface Concept and a supplied page composition.
/*$>*/
/*<#*/
import {
  Action,
  ActionType,
  MethodCreator,
  axiumConcludeType,
  createAction,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess
} from 'stratimux';

import { helloWorld } from '../../helloWorld/qualities/helloWorld.quality';
import { elementEventBinding } from '../../../model/html';
import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlHelloWorldType: ActionType = 'Html create hello world composition';
export const htmlHelloWorld = prepareActionCreator(htmlHelloWorldType);

const createHelloWorldMethodCreator: MethodCreator = () =>
  createMethod((action: Action) => {
    if (action.strategy) {
      const helloWorldId = '#helloWorld';
      return strategySuccess(action.strategy, userInterface_appendCompositionToPage(action.strategy, {
        id: helloWorldId,
        boundSelectors: [],
        bindings: {
          '#helloWorld': [{
            action: helloWorld(),
            eventBinding: elementEventBinding.onclick,
          }]
        },
        action: htmlHelloWorld(),
        html: /*html*/`<h1 id=${helloWorldId}>Hello World</h1>`
      }));
    }
    return createAction(axiumConcludeType);
  });

export const htmlHelloWorldQuality = createQuality(
  htmlHelloWorldType,
  defaultReducer,
  createHelloWorldMethodCreator,
);
