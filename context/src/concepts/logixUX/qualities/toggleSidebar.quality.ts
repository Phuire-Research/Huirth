/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will toggle the sideBarExpanded property on the supplied state.
$>*/
/*<#*/
import { Action, createQualitySet, defaultMethodCreator } from 'stratimux';
import { LogixUXState } from '../logixUX.concept';

export const [logixUXToggleSidebar, logixUXToggleSidebarType, logixUXToggleSidebarQuality] = createQualitySet({
  type: 'Create logixUX ToggleSidebar',
  reducer: (state: LogixUXState): LogixUXState => {
    return {
      ...state,
      sideBarExpanded: !state.sideBarExpanded,
    };
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
