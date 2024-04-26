/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger the count plus seven strategy.
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
import { logixUXPlusSevenStrategy } from '../strategies/countPlusSeven.strategy';
import { Subject } from 'rxjs';

export const [logixUXTriggerPlusCountingStrategy, logixUXTriggerPlusCountingStrategyType, logixUXTriggerPlusCountingStrategyQuality] =
  createQualitySet({
    type: 'Create logixUX trigger plus seven counting strategy',
    reducer: nullReducer,
    methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
      createMethodDebounceWithState<CounterState>(
        (_, state) => {
          const strategy = logixUXPlusSevenStrategy(state.count, semaphore as number);
          return strategyBegin(strategy);
        },
        concepts$ as UnifiedSubject,
        semaphore as number,
        50
      ),
  });
/*#>*/
