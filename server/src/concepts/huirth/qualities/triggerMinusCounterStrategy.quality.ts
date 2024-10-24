/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the minus count seven strategy.
$>*/
/*<#*/
import { CounterState, createMethodDebounceWithState, createQualityCard, nullReducer, strategyBegin } from 'stratimux';
import { huirthMinusSevenStrategy } from '../strategies/countMinusSeven.strategy';
import { HuirthDeck, huirthState } from '../huirth.concept';

export const huirthTriggerMinusCountingStrategy = createQualityCard<huirthState, HuirthDeck>({
  type: 'Create huirth trigger minus seven counting strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithState(({ state, deck }) => {
      const strategy = huirthMinusSevenStrategy((state as unknown as CounterState).count, deck);
      return strategyBegin(strategy);
    }, 3),
});
/*#>*/
