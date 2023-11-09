import {
  ActionType,
  MethodCreator,
  countingStrategy,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyBegin,
} from 'stratimux';

export type LogixUXTriggerCountingStrategyPayload = {
  count: number
}
export const logixUXTriggerCountingStrategyType: ActionType = 'Create logixUX triggerCountingStrategy';
export const logixUXTriggerCountingStrategy =
  prepareActionWithPayloadCreator<LogixUXTriggerCountingStrategyPayload>(logixUXTriggerCountingStrategyType);

const createLogixUXTriggerCountingStrategyMethodCreator: MethodCreator = () => createMethod(
  (action) => {
    const count = selectPayload<LogixUXTriggerCountingStrategyPayload>(action).count;
    const strategy = countingStrategy();
    strategy.topic += ` from ${count}`;
    return strategyBegin(strategy);
  }
);

export const logixUXTriggerCountingStrategyQuality = createQuality(
  logixUXTriggerCountingStrategyType,
  defaultReducer,
  createLogixUXTriggerCountingStrategyMethodCreator,
);