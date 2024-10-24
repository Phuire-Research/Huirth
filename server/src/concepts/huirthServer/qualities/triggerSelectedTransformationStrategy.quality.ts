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
} from 'stratimux';
import {
  huirthVerboseAddingStrategySelect,
  huirthVerboseAdditionAndSubtractionStrategySelect,
  huirthVerboseSubtractionStrategySelect,
} from '../../huirth/huirth.model';
import { HuirthServerDeck, huirthServerState } from '../huirthServer.concept';
import { huirthServerGenerateVerboseAddingStrategy } from './generateVerboseAddingDataSet.quality';
import { huirthServerGenerateVerboseSubtractionStrategy } from './generateVerboseSubtractionDataSet.quality';
import { huirthServerGenerateVerboseAdditionAndSubtractionStrategy } from './generateVerboseAdditionAndSubtractionDataSet.quality';

export type huirthServerTriggerSelectTransformationStrategyPayload = {
  selection: string;
};
// [NOTE : TODO] POST TYPESCRIPT ISSUE IN REGARDS TO DECK UTILIZATION HERE
// Replication
// 1. Remove deck from the type parameters of createMethodDebounce method..
// 2. Use the deck interface to access actions directly, versus the import plus actionCreator
// 3. Assumes that huirthServerTriggerSelectTransformationStrategy is being used in the function, it is not.
// [TEMPORARY POSSIBLE FIX] Upgrade Typescript when more time granted.
export const huirthServerTriggerSelectTransformationStrategy = createQualityCardWithPayload<
  huirthServerState,
  huirthServerTriggerSelectTransformationStrategyPayload,
  HuirthServerDeck
>({
  type: 'huirthServer trigger passed transformation strategy from payload',
  reducer: nullReducer,
  methodCreator: () =>
    createMethodDebounce(({ action, deck }) => {
      const { selection } = action.payload;
      let finalAction;
      switch (selection) {
        case huirthVerboseAddingStrategySelect: {
          finalAction = huirthServerGenerateVerboseAddingStrategy.actionCreator({ agreement: 600000 });
          break;
        }
        case huirthVerboseSubtractionStrategySelect: {
          finalAction = huirthServerGenerateVerboseSubtractionStrategy.actionCreator({ agreement: 600000 });
          break;
        }
        case huirthVerboseAdditionAndSubtractionStrategySelect: {
          finalAction = huirthServerGenerateVerboseAdditionAndSubtractionStrategy.actionCreator({ agreement: 600000 });
          break;
        }
        default: {
          break;
        }
      }
      if (finalAction) {
        return strategyBegin(
          createStrategy({
            topic: 'Begin Transformation Strategy',
            initialNode: createActionNode(finalAction, {
              agreement: 600000,
            }),
          })
        );
      }
      return action;
    }, 50),
});
/*#>*/
