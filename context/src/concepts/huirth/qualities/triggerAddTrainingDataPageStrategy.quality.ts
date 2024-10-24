/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import { createMethodWithConcepts, createQualityCardWithPayload, nullReducer, selectPayload, strategyBegin } from 'stratimux';
import { huirthAddTrainingDataPageStrategy } from '../strategies/addPageTrainingData.strategy';
import { huirthGeneratedTrainingDataPageStrategy } from '../strategies/pages/generatedTrainingDataPage.strategy';
import { HuirthDeck, huirthState } from '../huirth.concept';

export type HuirthTriggerAddTrainingDataPage = {
  name: string;
};

export const huirthTriggerAddTrainingDataPage = createQualityCardWithPayload<huirthState, HuirthTriggerAddTrainingDataPage, HuirthDeck>({
  type: 'Huirth trigger add training data page',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodWithConcepts(({ action, concepts_, deck }) => {
      const { name } = selectPayload<HuirthTriggerAddTrainingDataPage>(action);
      const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(name, deck);
      const strategyAction = strategyBegin(huirthAddTrainingDataPageStrategy(name, generatedTrainingDataPage, concepts_, deck));
      return strategyAction;
    }),
});
/*#>*/
