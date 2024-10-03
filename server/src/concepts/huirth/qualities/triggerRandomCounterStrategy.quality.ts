/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger a randomly generated counting strategy.
$>*/
/*<#*/
import { CounterState, createMethodDebounceWithState, createQualityCard, nullReducer, strategyBegin } from 'stratimux';
import { huirthGenerateCountingStrategy } from '../strategies/generateCountingStrategy.strategy';
import { huirthState } from '../huirth.concept';

export const huirthTriggerRandomCountingStrategy = createQualityCard<huirthState>({
  type: 'Create huirth trigger random counting strategy',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounceWithState<huirthState & CounterState>(({ state }) => {
      const strategy = huirthGenerateCountingStrategy(state.count);
      return strategyBegin(strategy);
    }, 3),
});
/*#>*/
