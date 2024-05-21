/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import {
  ActionStrategy,
  Concepts,
  KeyedSelector,
  axiumKick,
  createAsyncMethodWithConcepts,
  createMethodWithConcepts,
  createQualitySetWithPayload,
  createStage,
  getAxiumState,
  nullReducer,
  selectPayload,
  selectSlice,
  stageWaitForOpenThenIterate,
  strategyBegin,
  strategySequence,
} from 'stratimux';
import { huirthGeneratedTrainingDataPageStrategy } from '../strategies/pages/generatedTrainingDataPage.strategy';
import { Subject } from 'rxjs';
import { huirthRemoveTrainingDataPageStrategy } from '../strategies/removeTrainingDataPage.strategy';
import { huirthAddTrainingDataPageStrategy } from '../strategies/addPageTrainingData.strategy';
import { huirth_createTrainingDataSelector } from '../huirth.selector';
import { TrainingData } from '../huirth.model';

type TriggerRemoveAddTrainingDataPage = {
  newName: string
  oldName: string
};

export const [
  huirthTriggerRemoveAddTrainingDataPage,
  huirthTriggerRemoveAddTrainingDataPageType,
  huirthTriggerRemoveAddTrainingDataPageQuality
] = createQualitySetWithPayload<TriggerRemoveAddTrainingDataPage>({
  type: 'Huirth trigger remove old page then add new generated training data page',
  reducer: nullReducer,
  methodCreator: (concepts$, semaphore) => createMethodWithConcepts((action, cpts) => {
    const selector = huirth_createTrainingDataSelector(cpts, semaphore);
    if (selector) {
      const {newName, oldName} = selectPayload<TriggerRemoveAddTrainingDataPage>(action);
      const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(newName);
      const strategyAdd = huirthAddTrainingDataPageStrategy(
        newName,
        generatedTrainingDataPage,
        cpts,
      );
      const strategyRemove = huirthRemoveTrainingDataPageStrategy(
        oldName,
      );
      return strategyBegin(strategySequence([strategyRemove, strategyAdd]) as ActionStrategy);
    } else {
      return action;
    }
  }, concepts$ as Subject<Concepts>, semaphore as number)
});
/*#>*/