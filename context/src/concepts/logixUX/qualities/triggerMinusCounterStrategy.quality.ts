/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger the minus count seven strategy.
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
import { logixUXMinusSevenStrategy } from '../strategies/countMinusSeven.strategy';
import { Subject } from 'rxjs';

export const [logixUXTriggerMinusCountingStrategy, logixUXTriggerMinusCountingStrategyType, logixUXTriggerMinusCountingStrategyQuality] =
  createQualitySet({
    type: 'Create logixUX trigger minus seven counting strategy',
    reducer: nullReducer,
    methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
      createMethodDebounceWithState<CounterState>(
        (_, state) => {
          const strategy = logixUXMinusSevenStrategy(state.count, semaphore as number);
          return strategyBegin(strategy);
        },
        concepts$ as UnifiedSubject,
        semaphore as number,
        50
      ),
  });
/*#>*/
