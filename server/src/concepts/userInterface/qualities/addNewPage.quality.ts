/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a quality that will add a page strategy to state, then dispatch that same strategy in the method.
To be later added back into state via the add composed page to state quality.
$>*/
/*<#*/
import {
  Action,
  createQualitySetWithPayload,
  defaultMethodCreator,
  selectPayload,
} from 'stratimux';
import { PageStrategyCreators } from '../../../model/userInterface';
import { UserInterfaceState } from '../userInterface.concept';

export type UserInterfaceAddNewPagePayload = {
  // name: string,
  pageStrategy: PageStrategyCreators,
}

export const [
  userInterfaceAddNewPage,
  userInterfaceAddNewPageType,
  userInterfaceAddNewPageQuality
] = createQualitySetWithPayload<UserInterfaceAddNewPagePayload>({
  type: 'User Interface Add New Page Strategy to state',
  reducer: (state: UserInterfaceState, action: Action): UserInterfaceState => {
    const payload = selectPayload<UserInterfaceAddNewPagePayload>(action);
    const {pageStrategies} = state;
    pageStrategies.push(payload.pageStrategy);
    return {
      ...state,
      pageStrategies
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/