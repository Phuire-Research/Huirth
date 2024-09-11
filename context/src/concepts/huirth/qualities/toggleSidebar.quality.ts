/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will toggle the sideBarExpanded property on the supplied state.
$>*/
/*<#*/
import { Action, createQualityCard, defaultMethodCreator } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';

export const [huirthToggleSidebar, huirthToggleSidebarType, huirthToggleSidebarQuality] = createQualityCard({
  type: 'Create huirth ToggleSidebar',
  reducer: (state: huirthState): huirthState => {
    return {
      ...state,
      sideBarExpanded: !state.sideBarExpanded,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
