/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger the currently selected transformation strategy if it has been imported.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createActionNode,
  createMethodDebounceWithState,
  createQuality,
  createStrategy,
  defaultReducer,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { logixUXGenerateVerboseCountingStrategy } from './generateVerboseCountingDataSet.quality';
import { logixUXVerboseCountingStrategySelect } from '../strategies/verboseCounting.strategy';

export const logixUXTriggerTransformationStrategyType: ActionType = 'Create logixUX trigger plus seven counting strategy';
export const logixUXTriggerTransformationStrategy = prepareActionCreator(logixUXTriggerTransformationStrategyType);

const createLogixUXTriggerTransformationStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethodDebounceWithState<LogixUXState>(
    (act, state) => {
      const { selectedTransformation } = state;
      let action;
      switch (selectedTransformation) {
        case logixUXVerboseCountingStrategySelect: {
          action = logixUXGenerateVerboseCountingStrategy(undefined, undefined, 60000);
          break;
        }
        default: {
          break;
        }
      }
      console.log('This is the trigger action', action);
      if (action) {
        return strategyBegin(
          createStrategy({
            topic: 'Begin Transformation Strategy',
            initialNode: createActionNode(action, {
              successNode: null,
              failureNode: null,
            }),
          })
        );
      }
      return act;
    },
    concepts$ as UnifiedSubject,
    semaphore as number,
    50
  );

export const logixUXTriggerTransformationStrategyQuality = createQuality(
  logixUXTriggerTransformationStrategyType,
  defaultReducer,
  createLogixUXTriggerTransformationStrategyMethodCreator
);
/*#>*/
