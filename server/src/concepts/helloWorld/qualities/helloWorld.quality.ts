/*<$
For the graph programming framework Stratimux and Hello World Concept, generate a quality that will console log 'Hello World!'
$>*/
/*<#*/
import { axiumConclude, createMethod, createQualityCard, nullReducer, strategySuccess } from '@phuire/stratimux';
import { HelloWorldState } from '../helloWorld.concept';

export const helloWorld = createQualityCard<HelloWorldState>({
  type: 'Hello World logs Hello World!',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod((action) => {
      console.log('Hello World!');
      if (action.strategy) {
        return strategySuccess(action.strategy);
      }
      return axiumConclude();
    }),
});
/*#>*/
