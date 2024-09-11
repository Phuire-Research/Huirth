/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will set a new training data page to state.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';

export type HuirthSetTrainingDataPagePayload = {
  trainingDataName: string;
};

export const [huirthSetTrainingDataPage, huirthSetTrainingDataPageType, huirthSetTrainingDataPageQuality] =
  createQualityCardWithPayload<HuirthSetTrainingDataPagePayload>({
    type: 'huirth set a new training data page',
    reducer: (state: huirthState, action: Action): huirthState => {
      const { trainingDataName } = selectPayload<HuirthSetTrainingDataPagePayload>(action);
      return {
        ...state,
        trainingDataPages: [...state.trainingDataPages, trainingDataName],
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
