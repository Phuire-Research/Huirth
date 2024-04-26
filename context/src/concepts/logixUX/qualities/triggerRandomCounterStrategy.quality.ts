/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger a randomly generated counting strategy.
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
import { logixUXGenerateCountingStrategy } from '../strategies/generateCountingStrategy.strategy';
import { Subject } from 'rxjs';

export const [logixUXTriggerRandomCountingStrategy, logixUXTriggerRandomCountingStrategyType, logixUXTriggerRandomCountingStrategyQuality] =
  createQualitySet({
    type: 'Create logixUX trigger random counting strategy',
    reducer: nullReducer,
    methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
      createMethodDebounceWithState<CounterState>(
        (_, state) => {
          const strategy = logixUXGenerateCountingStrategy(state.count, semaphore as number);
          return strategyBegin(strategy);
        },
        concepts$ as UnifiedSubject,
        semaphore as number,
        50
      ),
  });
/*#>*/
