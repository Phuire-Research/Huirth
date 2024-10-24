/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will add a new default named dataset to the state's trainingData property.
$>*/
/*<#*/
import {
  ActionStrategy,
  Concepts,
  createMethodWithConcepts,
  createQualityCardWithPayload,
  nullReducer,
  selectPayload,
  strategyBegin,
  strategySequence,
} from 'stratimux';
import { huirthGeneratedTrainingDataPageStrategy } from '../strategies/pages/generatedTrainingDataPage.strategy';
import { Subject } from 'rxjs';
import { huirthRemoveTrainingDataPageStrategy } from '../strategies/removeTrainingDataPage.strategy';
import { huirthAddTrainingDataPageStrategy } from '../strategies/addPageTrainingData.strategy';
import { huirth_createTrainingDataSelector } from '../huirth.selector';
import { HuirthDeck, huirthState } from '../huirth.concept';

export type HuirthTriggerRemoveAddTrainingDataPage = {
  newName: string;
  oldName: string;
};

export const huirthTriggerRemoveAddTrainingDataPage = createQualityCardWithPayload<
  huirthState,
  HuirthTriggerRemoveAddTrainingDataPage,
  HuirthDeck
>({
  type: 'Huirth trigger remove old page then add new generated training data page',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodWithConcepts(({ action, concepts_, deck }) => {
      const { newName, oldName } = action.payload;
      const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(newName, deck);
      const strategyAdd = huirthAddTrainingDataPageStrategy(newName, generatedTrainingDataPage, concepts_, deck);
      strategyAdd.priority = 3000;
      const strategyRemove = huirthRemoveTrainingDataPageStrategy(oldName, deck);
      strategyRemove.priority = 3000;
      return strategyBegin(strategySequence([strategyRemove, strategyAdd]) as ActionStrategy);
    }),
});
/*#>*/
