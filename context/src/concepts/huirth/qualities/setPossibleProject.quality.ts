/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that set the possibleProject based on an input value and determine if it is valid url that includes .git.
$>*/
/*<#*/
import { Action, createQualityCard } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';

const getName = (url: string): string | undefined => {
  const split = url.split('/');
  // console.log('CHECK SPLIT', split[split.length - 1].split('.git'));
  const finalSplit = split[split.length - 1].split('.git');
  return finalSplit.length > 1 ? finalSplit[0] : undefined;
};

export const huirthSetPossibleProject = createQualityCard<huirthState>({
  type: 'huirth set the possible project and check if it is valid',
  reducer: (state, action) => {
    const { trainingData } = state;
    const target = userInterface_selectInputTarget(action);
    const value = target.value;
    // eslint-disable-next-line no-useless-escape
    const urlRegex = RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
    const isValid = urlRegex.test(value);
    const name = getName(value);
    // console.log('CHECK NAME', name, isValid);
    let exists = false;
    if (name && isValid) {
      for (const data of trainingData) {
        if (data.name === name) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        return {
          possibleProject: value,
          possibleProjectValid: true,
        };
      }
    }
    return {
      possibleProject: value,
      possibleProjectValid: false,
    };
  },
});
/*#>*/
