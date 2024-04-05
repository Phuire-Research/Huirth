/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger the count plus seven strategy.
$>*/
/*<#*/
import {
  ActionType,
  Concepts,
  CounterState,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithState,
  createQuality,
  nullReducer,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { logixUXPlusSevenStrategy } from '../strategies/countPlusSeven.strategy';
import { Subject } from 'rxjs';

export const logixUXTriggerPlusCountingStrategyType: ActionType = 'Create logixUX trigger plus seven counting strategy';
export const logixUXTriggerPlusCountingStrategy = prepareActionCreator(logixUXTriggerPlusCountingStrategyType);

const createLogixUXTriggerPlusCountingStrategyMethodCreator: MethodCreator = (concepts$?: Subject<Concepts>, semaphore?: number) =>
  createMethodDebounceWithState<CounterState>(
    (_, state) => {
      const strategy = logixUXPlusSevenStrategy(state.count, semaphore as number);
      return strategyBegin(strategy);
    },
    concepts$ as UnifiedSubject,
    semaphore as number,
    50
  );

export const logixUXTriggerPlusCountingStrategyQuality = createQuality(
  logixUXTriggerPlusCountingStrategyType,
  nullReducer,
  createLogixUXTriggerPlusCountingStrategyMethodCreator
);
/*#>*/
