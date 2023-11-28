/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger the currently selected transformation strategy if it has been imported.
$>*/
/*<#*/
import {
  ActionType,
  MethodCreator,
  UnifiedSubject,
  createActionNode,
  createMethodDebounce,
  createQuality,
  createStrategy,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { logixUXVerboseAddingStrategySelect, logixUXVerboseAdditionAndSubtractionStrategySelect, logixUXVerboseSubtractionStrategySelect } from '../../logixUX/logixUX.model';
import { logixUXServerGenerateVerboseAddingStrategy } from './generateVerboseAddingDataSet.quality';
import { logixUXServerGenerateVerboseSubtractionStrategy } from './generateVerboseSubtractionDataSet.quality';
import { logixUXServerGenerateVerboseAdditionAndSubtractionStrategy } from './generateVerboseAdditionAndSubtractionDataSet.quality';

export type LogixUXServerTriggerSelectTransformationStrategyPayload = {
  selection: string
}
export const logixUXServerTriggerSelectTransformationStrategyType: ActionType = 'logixUXServer trigger passed transformation strategy from payload';
export const logixUXServerTriggerSelectTransformationStrategy =
  prepareActionWithPayloadCreator<LogixUXServerTriggerSelectTransformationStrategyPayload>(logixUXServerTriggerSelectTransformationStrategyType);

const createLogixUXServerTriggerSelectTransformationStrategyMethodCreator: MethodCreator = (concepts$?: UnifiedSubject) =>
  createMethodDebounce(
    (act) => {
      const { selection } = selectPayload<LogixUXServerTriggerSelectTransformationStrategyPayload>(act);
      let action;
      switch (selection) {
      case logixUXVerboseAddingStrategySelect: {
        action = logixUXServerGenerateVerboseAddingStrategy(undefined, undefined, 6000000);
        break;
      }
      case logixUXVerboseSubtractionStrategySelect: {
        action = logixUXServerGenerateVerboseSubtractionStrategy(undefined, undefined, 6000000);
        break;
      }
      case logixUXVerboseAdditionAndSubtractionStrategySelect: {
        action = logixUXServerGenerateVerboseAdditionAndSubtractionStrategy(undefined, undefined, 6000000);
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
              failureNode: null
            })
          })
        );
      }
      return act;
    }, 50
  );

export const logixUXServerTriggerSelectTransformationStrategyQuality = createQuality(
  logixUXServerTriggerSelectTransformationStrategyType,
  defaultReducer,
  createLogixUXServerTriggerSelectTransformationStrategyMethodCreator,
);
/*#>*/