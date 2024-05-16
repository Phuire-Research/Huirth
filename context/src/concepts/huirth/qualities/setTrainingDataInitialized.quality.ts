/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will inform that the training data has loaded.
$>*/
/*<#*/
import { createQualitySet, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';

export const [huirthSetTrainingDataInitialized, huirthSetTrainingDataInitializedType, huirthSetTrainingDataInitializedQuality] =
  createQualitySet({
    type: 'huirth set that training data is initialized',
    reducer: (state: huirthState): huirthState => {
      return {
        ...state,
        trainingDataInitialized: true,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
