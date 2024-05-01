/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the currently selected transformation strategy if it has been imported.
$>*/
/*<#*/
import {
  createActionNode,
  createMethodDebounce,
  createQualitySetWithPayload,
  createStrategy,
  nullReducer,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { huirthVerboseAddingStrategySelect, huirthVerboseAdditionAndSubtractionStrategySelect, huirthVerboseSubtractionStrategySelect } from '../../huirth/huirth.model';
import { huirthServerGenerateVerboseAddingStrategy } from './generateVerboseAddingDataSet.quality';
import { huirthServerGenerateVerboseSubtractionStrategy } from './generateVerboseSubtractionDataSet.quality';
import { huirthServerGenerateVerboseAdditionAndSubtractionStrategy } from './generateVerboseAdditionAndSubtractionDataSet.quality';

export type huirthServerTriggerSelectTransformationStrategyPayload = {
  selection: string
}

export const [
  huirthServerTriggerSelectTransformationStrategy,
  huirthServerTriggerSelectTransformationStrategyType,
  huirthServerTriggerSelectTransformationStrategyQuality
] = createQualitySetWithPayload<huirthServerTriggerSelectTransformationStrategyPayload>({
  type: 'huirthServer trigger passed transformation strategy from payload',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounce(
      (act) => {
        const { selection } = selectPayload<huirthServerTriggerSelectTransformationStrategyPayload>(act);
        let action;
        switch (selection) {
        case huirthVerboseAddingStrategySelect: {
          action = huirthServerGenerateVerboseAddingStrategy(undefined, undefined, 6000000);
          break;
        }
        case huirthVerboseSubtractionStrategySelect: {
          action = huirthServerGenerateVerboseSubtractionStrategy(undefined, undefined, 6000000);
          break;
        }
        case huirthVerboseAdditionAndSubtractionStrategySelect: {
          action = huirthServerGenerateVerboseAdditionAndSubtractionStrategy(undefined, undefined, 6000000);
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
              initialNode: createActionNode(action)
            })
          );
        }
        return act;
      }, 50
    )
});
/*#>*/