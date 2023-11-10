import {
  ActionType,
  Counter,
  MethodCreator,
  UnifiedSubject,
  countingStrategy,
  createAsyncMethodWithState,
  createMethodDebounceWithState,
  createMethodWithState,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { logixUXGenerateCountingStrategy } from '../strategies/generateCountingStrategy.strategy';
import { logixUXPlusSevenStrategy } from '../strategies/countPlusSeven.strategy';
import { logixUXMinusSevenStrategy } from '../strategies/countMinusSeven.strategy';

export type LogixUXTriggerCountingStrategyPayload = {
  number: number;
};
export const logixUXTriggerCountingStrategyType: ActionType = 'Create logixUX triggerCountingStrategy';
export const logixUXTriggerCountingStrategy =
  prepareActionWithPayloadCreator<LogixUXTriggerCountingStrategyPayload>(logixUXTriggerCountingStrategyType);

const createLogixUXTriggerCountingStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithState<Counter>(
    (action, state) => {
      const payload = selectPayload<LogixUXTriggerCountingStrategyPayload>(action);

      // let strategy = logixUXGenerateCountingStrategy(state.count, semaphore as number);
      let strategy = logixUXMinusSevenStrategy(state.count, semaphore as number);
      if (payload.number === 1) {
        strategy = logixUXPlusSevenStrategy(state.count, semaphore as number);
      }
      // const strategy = countingStrategy();
      // strategy.topic += ' :' + state.count;
      // console.log('CHECK COUNTING', state.count);
      return strategyBegin(strategy);
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXTriggerCountingStrategyQuality = createQuality(
  logixUXTriggerCountingStrategyType,
  defaultReducer,
  createLogixUXTriggerCountingStrategyMethodCreator,
);