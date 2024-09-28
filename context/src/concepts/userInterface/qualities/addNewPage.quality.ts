/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will add a page strategy to state, then dispatch that same strategy in the method.
To be later added back into state via the add composed page to state quality.
$>*/
/*<#*/
import { Action, createQualityCardWithPayload, defaultMethodCreator, selectPayload } from '@phuire/stratimux';
import { PageStrategyCreators } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceAddNewPagePayload = {
  // name: string,
  pageStrategy: PageStrategyCreators;
};

export const userInterfaceAddNewPage =
  createQualityCardWithPayload<UserInterfaceState, UserInterfaceAddNewPagePayload>({
    type: 'User Interface Add New Page Strategy to state',
    reducer: (state, action) => {
      const { payload } = action;
      const { pageStrategies } = state;
      pageStrategies.push(payload.pageStrategy);
      return {
        ...state,
        pageStrategies,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
