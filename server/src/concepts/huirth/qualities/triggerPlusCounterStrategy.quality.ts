/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the count plus seven strategy.
$>*/
/*<#*/
import { CounterState, createMethodDebounceWithState, createQualityCard, nullReducer, strategyBegin } from 'stratimux';
import { huirthPlusSevenStrategy } from '../strategies/countPlusSeven.strategy';
import { HuirthDeck, huirthState } from '../huirth.concept';

export const huirthTriggerPlusCountingStrategy = createQualityCard<huirthState, HuirthDeck>({
  type: 'Create huirth trigger plus seven counting strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithState<huirthState & CounterState, void, HuirthDeck>(({ state, deck }) => {
      const strategy = huirthPlusSevenStrategy(state.count, deck);
      return strategyBegin(strategy);
    }, 3),
});
/*#>*/
