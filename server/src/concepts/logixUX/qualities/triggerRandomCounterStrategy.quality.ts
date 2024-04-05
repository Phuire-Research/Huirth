/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger a randomly generated counting strategy.
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
import { logixUXGenerateCountingStrategy } from '../strategies/generateCountingStrategy.strategy';
import { Subject } from 'rxjs';

export const logixUXTriggerRandomCountingStrategyType: ActionType = 'Create logixUX trigger random counting strategy';
export const logixUXTriggerRandomCountingStrategy =
  prepareActionCreator(logixUXTriggerRandomCountingStrategyType);

const createLogixUXTriggerRandomCountingStrategyMethodCreator: MethodCreator = (concepts$?: Subject<Concepts>, semaphore?: number) =>
  createMethodDebounceWithState<CounterState>(
    (_, state) => {
      const strategy = logixUXGenerateCountingStrategy(state.count, semaphore as number);
      return strategyBegin(strategy);
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXTriggerRandomCountingStrategyQuality = createQuality(
  logixUXTriggerRandomCountingStrategyType,
  nullReducer,
  createLogixUXTriggerRandomCountingStrategyMethodCreator,
);
/*#>*/