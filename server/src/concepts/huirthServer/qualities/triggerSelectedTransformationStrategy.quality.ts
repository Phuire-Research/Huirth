/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the currently selected transformation strategy if it has been imported.
$>*/
/*<#*/
import {
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
import { huirthServerState } from '../huirthServer.concept';

export type huirthServerTriggerSelectTransformationStrategyPayload = {
  selection: string;
};

export const huirthServerTriggerSelectTransformationStrategy =
  createQualityCardWithPayload<huirthServerState, huirthServerTriggerSelectTransformationStrategyPayload>({
    type: 'huirthServer trigger passed transformation strategy from payload',
    reducer: nullReducer,
    methodCreator: () =>
      createMethodDebounce((act) => {
        const { selection } = act.payload;
        let action;
        switch (selection) {
        case huirthVerboseAddingStrategySelect: {
          action = huirthServerGenerateVerboseAddingStrategy.actionCreator({ agreement: 600000 });
          break;
        }
        case huirthVerboseSubtractionStrategySelect: {
          action = huirthServerGenerateVerboseSubtractionStrategy.actionCreator({ agreement: 600000 });
          break;
        }
        case huirthVerboseAdditionAndSubtractionStrategySelect: {
          action = huirthServerGenerateVerboseAdditionAndSubtractionStrategy.actionCreator({ agreement: 600000 });
          break;
        }
        default: {
          break;
        }
        }
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
