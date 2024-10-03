/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will inform that the training data has loaded.
$>*/
/*<#*/
import { createQualityCard, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';

export const huirthSetTrainingDataInitialized = createQualityCard<huirthState>({
  type: 'huirth set that training data is initialized',
  reducer: (state) => {
    return {
      trainingDataInitialized: true,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
