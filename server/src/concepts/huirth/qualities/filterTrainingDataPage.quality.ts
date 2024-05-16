/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will filter out a new training data from state.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { huirthState } from '../huirth.concept';

export type HuirthFilterTrainingDataPagePayload = {
  trainingDataName: string
}

export const [
  huirthFilterTrainingDataPage,
  huirthFilterTrainingDataPageType,
  huirthFilterTrainingDataPageQuality
] = createQualitySetWithPayload<HuirthFilterTrainingDataPagePayload>({
  type: 'huirth filter training data page',
  reducer: (state: huirthState, action: Action): huirthState => {
    const {trainingDataName} = selectPayload<HuirthFilterTrainingDataPagePayload>(action);
    return {
      ...state,
      trainingDataPages: state.trainingDataPages.filter(name => name !== trainingDataName)
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/