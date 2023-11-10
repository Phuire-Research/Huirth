import {
  ActionType,
  Counter,
  MethodCreator,
  UnifiedSubject,
  countingStrategy,
  createMethod,
  createMethodWithState,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';

export const logixUXTriggerCountingStrategyType: ActionType = 'Create logixUX triggerCountingStrategy';
export const logixUXTriggerCountingStrategy = prepareActionCreator(logixUXTriggerCountingStrategyType);

const createLogixUXTriggerCountingStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodWithState<Counter>(
    (action, state) => {
      const strategy = countingStrategy();
      strategy.topic += ` from ${state.count}`;
      return strategyBegin(strategy);
    },
    concepts$ as UnifiedSubject,
    semaphore as number
  );

export const logixUXTriggerCountingStrategyQuality = createQuality(
  logixUXTriggerCountingStrategyType,
  defaultReducer,
  createLogixUXTriggerCountingStrategyMethodCreator
);
