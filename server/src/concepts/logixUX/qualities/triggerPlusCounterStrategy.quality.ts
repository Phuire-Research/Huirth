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
import { logixUXPlusSevenStrategy } from '../strategies/countPlusSeven.strategy';

export const logixUXTriggerPlusCountingStrategyType: ActionType = 'Create logixUX triggerPlusCountingStrategy';
export const logixUXTriggerPlusCountingStrategy =
  prepareActionCreator(logixUXTriggerPlusCountingStrategyType);

const createLogixUXTriggerPlusCountingStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithState<Counter>(
    (_, state) => {
      const strategy = logixUXPlusSevenStrategy(state.count, semaphore as number);
      return strategyBegin(strategy);
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXTriggerPlusCountingStrategyQuality = createQuality(
  logixUXTriggerPlusCountingStrategyType,
  defaultReducer,
  createLogixUXTriggerPlusCountingStrategyMethodCreator,
);