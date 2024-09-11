/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the currently selected transformation strategy if it has been imported.
$>*/
/*<#*/
import {
  axiumLog,
  createActionNode,
  createMethodDebounce,
  createQualityCardWithPayload,
  createStrategy,
  nullReducer,
  selectPayload,
  strategyBegin,
} from '@phuire/stratimux';
import {
  huirthVerboseAddingStrategySelect,
  huirthVerboseAdditionAndSubtractionStrategySelect,
  huirthVerboseSubtractionStrategySelect,
} from '../../huirth/huirth.model';
import { huirthServerGenerateVerboseAddingStrategy } from './generateVerboseAddingDataSet.quality';
import { huirthServerGenerateVerboseSubtractionStrategy } from './generateVerboseSubtractionDataSet.quality';
import { huirthServerGenerateVerboseAdditionAndSubtractionStrategy } from './generateVerboseAdditionAndSubtractionDataSet.quality';

export type huirthServerTriggerSelectTransformationStrategyPayload = {
  selection: string;
};

export const [
  huirthServerTriggerSelectTransformationStrategy,
  huirthServerTriggerSelectTransformationStrategyType,
  huirthServerTriggerSelectTransformationStrategyQuality,
] = createQualityCardWithPayload<huirthServerTriggerSelectTransformationStrategyPayload>({
  type: 'huirthServer trigger passed transformation strategy from payload',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounce((act) => {
      const { selection } = selectPayload<huirthServerTriggerSelectTransformationStrategyPayload>(act);
      let action;
      switch (selection) {
        case huirthVerboseAddingStrategySelect: {
          action = huirthServerGenerateVerboseAddingStrategy({ agreement: 600000 });
          break;
        }
        case huirthVerboseSubtractionStrategySelect: {
          action = huirthServerGenerateVerboseSubtractionStrategy({ agreement: 600000 });
          break;
        }
        case huirthVerboseAdditionAndSubtractionStrategySelect: {
          action = huirthServerGenerateVerboseAdditionAndSubtractionStrategy({ agreement: 600000 });
          break;
        }
        default: {
          break;
        }
      }
      // action = axiumLog();
      // action.payload = {
      //   time: Date.now(),
      //   agreement: 6000000
      // };
      console.log('This is the trigger action', action);
      if (action) {
        return strategyBegin(
          createStrategy({
            topic: 'Begin Transformation Strategy',
            initialNode: createActionNode(action, {
              agreement: 600000,
            }),
          })
        );
      }
      return act;
    }, 50),
});
/*#>*/
