/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import {
  ActionStrategy,
  Concepts,
  createMethodWithConcepts,
  createQualitySetWithPayload,
  nullReducer,
  selectPayload,
  strategyBegin,
  strategySequence,
} from 'stratimux';
import { huirthGeneratedTrainingDataPageStrategy } from '../strategies/pages/generatedTrainingDataPage.strategy';
import { Subject } from 'rxjs';
import { huirthRemoveTrainingDataPageStrategy } from '../strategies/removeTrainingDataPage.strategy';
import { huirthAddTrainingDataPageStrategy } from '../strategies/addPageTrainingData.strategy';

type TriggerRemoveAddTrainingDataPage = {
  newName: string;
  oldName: string;
};

export const [
  huirthTriggerRemoveAddTrainingDataPage,
  huirthTriggerRemoveAddTrainingDataPageType,
  huirthTriggerRemoveAddTrainingDataPageQuality,
] = createQualitySetWithPayload<TriggerRemoveAddTrainingDataPage>({
  type: 'Huirth trigger remove old page then add new generated training data page',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) =>
    createMethodWithConcepts(
      (action, concepts) => {
        const { newName, oldName } = selectPayload<TriggerRemoveAddTrainingDataPage>(action);
        console.log('CHECK NAMES newName', newName, 'Old Name', oldName);
        const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(newName);
        const strategyAdd = huirthAddTrainingDataPageStrategy(newName, generatedTrainingDataPage, concepts);
        const strategyRemove = huirthRemoveTrainingDataPageStrategy(oldName);
        return strategyBegin(strategySequence([strategyRemove, strategyAdd]) as ActionStrategy);
      },
      concepts$ as Subject<Concepts>,
      semaphore as number
    ),
});
/*#>*/
