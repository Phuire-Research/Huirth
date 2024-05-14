/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger a randomly generated counting strategy.
$>*/
/*<#*/
import {
  Concepts,
  CounterState,
  UnifiedSubject,
  createMethodDebounceWithState,
  createQualitySet,
  nullReducer,
  strategyBegin,
} from 'stratimux';
import { huirthGenerateCountingStrategy } from '../strategies/generateCountingStrategy.strategy';
import { Subject } from 'rxjs';

export const [huirthTriggerRandomCountingStrategy, huirthTriggerRandomCountingStrategyType, huirthTriggerRandomCountingStrategyQuality] =
  createQualitySet({
    type: 'Create huirth trigger random counting strategy',
    reducer: nullReducer,
    methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
      createMethodDebounceWithState<CounterState>(
        (_, state) => {
          const strategy = huirthGenerateCountingStrategy(state.count, semaphore as number);
          return strategyBegin(strategy);
        },
        concepts$ as UnifiedSubject,
        semaphore as number,
        3
      ),
  });
/*#>*/
