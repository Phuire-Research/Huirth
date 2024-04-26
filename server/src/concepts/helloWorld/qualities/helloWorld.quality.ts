/*<$
For the graph programming framework Stratimux and Hello World Concept, generate a quality that will console log 'Hello World!'
$>*/
/*<#*/
import {
  Action,
  axiumConclude,
  createMethod,
  createQualitySet,
  nullReducer,
  strategySuccess,
} from 'stratimux';

export const [
  helloWorld,
  helloWorldType,
  helloWorldQuality,
] = createQualitySet({
  type: 'Hello World logs Hello World!',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod((action: Action) => {
      console.log('Hello World!');
      if (action.strategy) {
        return strategySuccess(action.strategy);
      }
      return axiumConclude();
    })
});
/*#>*/