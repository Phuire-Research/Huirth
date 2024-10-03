/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that set the current selected transformation to the incoming target value.
$>*/
/*<#*/
import { Action, createQualityCard } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export const huirthSetSelectedTransformation = createQualityCard<huirthState>({
  type: 'huirth set the currently selected transformation',
  reducer: (_, action) => {
    const target = userInterface_selectInputTarget(action);
    const value = target.value;
    // eslint-disable-next-line no-useless-escape
    return {
      selectedTransformation: value,
    };
  },
});
/*#>*/
