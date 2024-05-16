/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import { Concepts, createMethodWithConcepts, createQualitySetWithPayload, nullReducer, selectPayload, strategyBegin } from 'stratimux';
import { huirthAddTrainingDataPageStrategy } from '../strategies/addPageTrainingData.strategy';
import { huirthGeneratedTrainingDataPageStrategy } from '../strategies/pages/generatedTrainingDataPage.strategy';
import { Subject } from 'rxjs';

type TriggerAddTrainingDataPage = {
  name: string;
};

export const [huirthTriggerAddTrainingDataPage, huirthTriggerAddTrainingDataPageType, huirthTriggerAddTrainingDataPageQuality] =
  createQualitySetWithPayload<TriggerAddTrainingDataPage>({
    type: 'Huirth trigger add training data page',
    reducer: nullReducer,
    methodCreator: (concepts$, semaphore) =>
      createMethodWithConcepts(
        (action, concepts) => {
          const { name } = selectPayload<TriggerAddTrainingDataPage>(action);
          const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(name);
          const strategyAction = strategyBegin(huirthAddTrainingDataPageStrategy(name, generatedTrainingDataPage, concepts));
          return strategyAction;
        },
        concepts$ as Subject<Concepts>,
        semaphore as number
      ),
  });
/*#>*/
