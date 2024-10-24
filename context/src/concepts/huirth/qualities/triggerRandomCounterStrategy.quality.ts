/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger a randomly generated counting strategy.
$>*/
/*<#*/
import { CounterState, createMethodDebounceWithState, createQualityCard, nullReducer, strategyBegin } from 'stratimux';
import { huirthGenerateCountingStrategy } from '../strategies/generateCountingStrategy.strategy';
import { HuirthDeck, huirthState } from '../huirth.concept';

export const huirthTriggerRandomCountingStrategy = createQualityCard<huirthState, HuirthDeck>({
  type: 'Create huirth trigger random counting strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithState<huirthState & CounterState, void, HuirthDeck>(({ state, deck }) => {
      const strategy = huirthGenerateCountingStrategy(state.count, deck);
      return strategyBegin(strategy);
    }, 3),
});
/*#>*/
