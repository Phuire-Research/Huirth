/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will attempt to parse a valid name from a provided url.
If valid it will then trigger the strategy that will install the target git repository via a supplied url to a directory of the given name.
$>*/
/*<#*/
import { Concepts, createMethodWithState, createQualityCard, strategyBegin } from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { ProjectStatus } from '../huirth.model';
import { huirthInstallGitRepositoryStrategy } from '../strategies/installGitProject.strategy';
import { Subject } from 'rxjs';

const getName = (url: string): string | undefined => {
  const split = url.split('/');
  console.log('CHECK SPLIT', split[split.length - 1].split('.git'));
  const finalSplit = split[split.length - 1].split('.git');
  return finalSplit.length > 1 ? finalSplit[0] : undefined;
};

export const [
  huirthFilterTriggerInstallGitRepository,
  huirthFilterTriggerInstallGitRepositoryType,
  huirthFilterTriggerInstallGitRepositoryQuality,
] = createQualityCard({
  type: 'Create huirth that filters only valid git urls to trigger install git repository',
  reducer: (state: huirthState) => {
    const { trainingData, projectsStatuses, possibleProject, possibleProjectValid } = state;
    const name = getName(possibleProject);
    let exists = false;
    if (name && possibleProjectValid) {
      for (const data of trainingData) {
        if (data.name === name) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        projectsStatuses.push({
          name,
          status: ProjectStatus.installing,
        });
        return {
          ...state,
          projectsStatuses,
          possibleProject: '',
        };
      }
    }
    return {
      ...state,
      possibleProject: 'INVALID',
    };
  },
  methodCreator: (concepts$?: Subject<Concepts>, semaphore?: number) =>
    createMethodWithState<huirthState>(
      (action, state) => {
        const { possibleProject, possibleProjectValid } = state;
        const name = getName(possibleProject);
        if (name && possibleProjectValid) {
          console.log('SENDING NAME TO SERVER', name);
          const strategy = huirthInstallGitRepositoryStrategy(possibleProject, name);
          return strategyBegin(strategy);
        } else {
          return action;
        }
      },
      concepts$ as Subject<Concepts>,
      semaphore as number
    ),
});
/*#>*/
