/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the count plus seven strategy.
$>*/
/*<#*/
import {
  CounterState,
  createMethodDebounceWithState,
  createQualityCard,
  nullReducer,
  strategyBegin,
} from '@phuire/stratimux';
import { huirthPlusSevenStrategy } from '../strategies/countPlusSeven.strategy';
import { huirthState } from '../huirth.concept';

export const huirthTriggerPlusCountingStrategy =
  createQualityCard<huirthState>({
    type: 'Create huirth trigger plus seven counting strategy',
    reducer: nullReducer,
    methodCreator: () =>
      createMethodDebounceWithState<huirthState & CounterState>(
        ({state}) => {
          const strategy = huirthPlusSevenStrategy(state.count);
          return strategyBegin(strategy);
        },
        3
      ),
  });
/*#>*/
