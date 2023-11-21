import {
  ActionType,
  Counter,
  MethodCreator,
  UnifiedSubject,
  createMethodDebounceWithState,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { logixUXGenerateCountingStrategy } from '../strategies/generateCountingStrategy.strategy';

export const logixUXTriggerRandomCountingStrategyType: ActionType = 'Create logixUX triggerRandomCountingStrategy';
export const logixUXTriggerRandomCountingStrategy = prepareActionCreator(logixUXTriggerRandomCountingStrategyType);

const createLogixUXTriggerRandomCountingStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithState<Counter>(
    (_, state) => {
      const strategy = logixUXGenerateCountingStrategy(state.count, semaphore as number);
      return strategyBegin(strategy);
    },
    concepts$ as UnifiedSubject,
    semaphore as number,
    50
  );

export const logixUXTriggerRandomCountingStrategyQuality = createQuality(
  logixUXTriggerRandomCountingStrategyType,
  defaultReducer,
  createLogixUXTriggerRandomCountingStrategyMethodCreator
);
