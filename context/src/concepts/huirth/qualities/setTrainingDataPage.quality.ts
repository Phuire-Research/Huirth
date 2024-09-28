/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will set a new training data page to state.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';

export type HuirthSetTrainingDataPagePayload = {
  trainingDataName: string;
};

export const huirthSetTrainingDataPage =
  createQualityCardWithPayload<huirthState, HuirthSetTrainingDataPagePayload>({
    type: 'huirth set a new training data page',
    reducer: (state, action) => {
      const { trainingDataName } = selectPayload<HuirthSetTrainingDataPagePayload>(action);
      return {
        trainingDataPages: [...state.trainingDataPages, trainingDataName],
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
