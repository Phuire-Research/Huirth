/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the count plus seven strategy.
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
import { huirthPlusSevenStrategy } from '../strategies/countPlusSeven.strategy';
import { Subject } from 'rxjs';

export const [
  huirthTriggerPlusCountingStrategy,
  huirthTriggerPlusCountingStrategyType,
  huirthTriggerPlusCountingStrategyQuality
] = createQualitySet({
  type: 'Create huirth trigger plus seven counting strategy',
  reducer: nullReducer,
  methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
    createMethodDebounceWithState<CounterState>(
      (_, state) => {
        const strategy = huirthPlusSevenStrategy(state.count, semaphore as number);
        return strategyBegin(strategy);
      }, concepts$ as UnifiedSubject, semaphore as number, 3
    )
});
/*#>*/