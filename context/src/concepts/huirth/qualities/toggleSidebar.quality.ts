/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will toggle the sideBarExpanded property on the supplied state.
$>*/
/*<#*/
import { createQualityCard, defaultMethodCreator } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';

export const huirthToggleSidebar = createQualityCard<huirthState>({
  type: 'Create huirth ToggleSidebar',
  reducer: (state) => {
    return {
      sideBarExpanded: !state.sideBarExpanded,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
