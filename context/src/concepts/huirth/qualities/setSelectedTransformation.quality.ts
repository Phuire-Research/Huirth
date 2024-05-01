/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that set the current selected transformation to the incoming target value.
$>*/
/*<#*/
import { Action, createQualitySet } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

export const [huirthSetSelectedTransformation, huirthSetSelectedTransformationType, huirthSetSelectedTransformationQuality] =
  createQualitySet({
    type: 'huirth set the currently selected transformation',
    reducer: (state: huirthState, action: Action): huirthState => {
      const target = userInterface_selectInputTarget(action);
      const value = target.value;
      // eslint-disable-next-line no-useless-escape
      return {
        ...state,
        selectedTransformation: value,
      };
    },
  });
/*#>*/
