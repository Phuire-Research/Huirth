/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will attempt to parse a valid name from a provided url.
If valid it will then trigger the strategy that will install the target git repository via a supplied url to a directory of the given name.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  Concepts,
  MethodCreator,
  UnifiedSubject,
  createMethodWithState,
  createQuality,
  prepareActionCreator,
  strategyBegin,
} from 'stratimux';
import { LogixUXState } from '../logixUX.concept';
import { ProjectStatus } from '../logixUX.model';
import { logixUXInstallGitRepositoryStrategy } from '../strategies/installGitProject.strategy';
import { Subject } from 'rxjs';

const getName = (url: string): string | undefined => {
  const split = url.split('/');
  console.log('CHECK SPLIT', split[split.length - 1].split('.git'));
  const finalSplit = split[split.length - 1].split('.git');
  return finalSplit.length > 1 ? finalSplit[0] : undefined;
};

export const logixUXFilterTriggerInstallGitRepositoryType: ActionType =
  'Create logixUX that filters only valid git urls to trigger install git repository';
export const logixUXFilterTriggerInstallGitRepository = prepareActionCreator(logixUXFilterTriggerInstallGitRepositoryType);

const logixUXFilterTriggerInstallGitRepositoryMethodCreator: MethodCreator = (concepts$?: Subject<Concepts>, semaphore?: number) =>
  createMethodWithState<LogixUXState>(
    (action, state) => {
      const { possibleProject, possibleProjectValid } = state;
      const name = getName(possibleProject);
      if (name && possibleProjectValid) {
        console.log('SENDING NAME TO SERVER', name);
        const strategy = logixUXInstallGitRepositoryStrategy(possibleProject, name);
        return strategyBegin(strategy);
      } else {
        return action;
      }
    },
    concepts$ as UnifiedSubject,
    semaphore as number
  );
const logixUXFilterTriggerInstallGitRepositoryReducer = (state: LogixUXState, action: Action) => {
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
};

export const logixUXFilterTriggerInstallGitRepositoryQuality = createQuality(
  logixUXFilterTriggerInstallGitRepositoryType,
  logixUXFilterTriggerInstallGitRepositoryReducer,
  logixUXFilterTriggerInstallGitRepositoryMethodCreator
);
/*#>*/
