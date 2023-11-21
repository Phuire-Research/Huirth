/*<$*/
// PROMPT: For the framework Stratimux and Hello World Concept, generate a quality that will console log 'Hello World!'
/*$>*/
/*<#*/
import {
  Action,
  ActionType,
  MethodCreator,
  axiumConclude,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess,
} from 'stratimux';

export const helloWorldType: ActionType = 'Hello World logs Hello World!';
export const helloWorld = prepareActionCreator(helloWorldType);

const createHelloWorldCreator: MethodCreator = () =>
  createMethod((action: Action) => {
    console.log('Hello World!');
    if (action.strategy) {
      return strategySuccess(action.strategy);
    }
    return axiumConclude();
  });

export const helloWorldQuality = createQuality(
  helloWorldType,
  defaultReducer,
  createHelloWorldCreator,
);
/*#>*/