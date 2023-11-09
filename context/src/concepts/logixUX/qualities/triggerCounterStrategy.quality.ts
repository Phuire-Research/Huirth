import {
  ActionType,
  MethodCreator,
  countingStrategy,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';

export const logixUXTriggerCountingStrategyType: ActionType = 'Create logixUX triggerCountingStrategy';
export const logixUXTriggerCountingStrategy = prepareActionCreator(logixUXTriggerCountingStrategyType);

const createLogixUXTriggerCountingStrategyMethodCreator: MethodCreator = () =>
  createMethod((_) => {
    return strategyBegin(countingStrategy());
  });

export const logixUXTriggerCountingStrategyQuality = createQuality(
  logixUXTriggerCountingStrategyType,
  defaultReducer,
  createLogixUXTriggerCountingStrategyMethodCreator
);
