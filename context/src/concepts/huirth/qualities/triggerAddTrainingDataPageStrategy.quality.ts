/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import { createMethodWithConcepts, createQualityCardWithPayload, nullReducer, selectPayload, strategyBegin } from 'stratimux';
import { huirthAddTrainingDataPageStrategy } from '../strategies/addPageTrainingData.strategy';
import { huirthGeneratedTrainingDataPageStrategy } from '../strategies/pages/generatedTrainingDataPage.strategy';
import { huirthState } from '../huirth.concept';

type TriggerAddTrainingDataPage = {
  name: string;
};

export const huirthTriggerAddTrainingDataPage = createQualityCardWithPayload<huirthState, TriggerAddTrainingDataPage>({
  type: 'Huirth trigger add training data page',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodWithConcepts(({ action, concepts_ }) => {
      const { name } = selectPayload<TriggerAddTrainingDataPage>(action);
      const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(name);
      const strategyAction = strategyBegin(huirthAddTrainingDataPageStrategy(name, generatedTrainingDataPage, concepts_));
      return strategyAction;
    }),
});
/*#>*/
