/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will toggle the sideBarExpanded property on the supplied state.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
} from 'stratimux';
import { huirthState } from '../huirth.concept';

export const [
  huirthToggleSidebar,
  huirthToggleSidebarType,
  huirthToggleSidebarQuality
] = createQualitySet({
  type: 'Create huirth ToggleSidebar',
  reducer: (state: huirthState): huirthState => {
    return {
      ...state,
      sideBarExpanded: !state.sideBarExpanded,
    };
  },
  methodCreator: defaultMethodCreator
});
/*#>*/