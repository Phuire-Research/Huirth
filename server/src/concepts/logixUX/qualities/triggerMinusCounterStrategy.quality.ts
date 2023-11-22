/*<$
For the framework Stratimux and a Concept logixUX, generate a quality that will trigger the minus count seven strategy.
$>*/
/*<#*/
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
import { logixUXMinusSevenStrategy } from '../strategies/countMinusSeven.strategy';

export const logixUXTriggerMinusCountingStrategyType: ActionType = 'Create logixUX trigger minus seven counting strategy';
export const logixUXTriggerMinusCountingStrategy =
  prepareActionCreator(logixUXTriggerMinusCountingStrategyType);

const createLogixUXTriggerMinusCountingStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithState<Counter>(
    (_, state) => {
      const strategy = logixUXMinusSevenStrategy(state.count, semaphore as number);
      return strategyBegin(strategy);
    }, concepts$ as UnifiedSubject, semaphore as number, 50
  );

export const logixUXTriggerMinusCountingStrategyQuality = createQuality(
  logixUXTriggerMinusCountingStrategyType,
  defaultReducer,
  createLogixUXTriggerMinusCountingStrategyMethodCreator,
);
/*#>*/