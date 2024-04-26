/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a quality that will trigger the strategy that will install the target git repository via a supplied url to a directory of the given name.
$>*/
/*<#*/
import { createMethod, createQualitySetWithPayload, nullReducer, selectPayload, strategyBegin } from 'stratimux';
import { logixUXInstallGitRepositoryStrategy } from '../strategies/installGitProject.strategy';

export type LogixUXTriggerInstallGitRepositoryPayload = {
  url: string;
  name: string;
};

export const [logixUXTriggerInstallGitRepository, logixUXTriggerInstallGitRepositoryType, logixUXTriggerInstallGitRepositoryQuality] =
  createQualitySetWithPayload<LogixUXTriggerInstallGitRepositoryPayload>({
    type: 'Create logixUX trigger install git repository',
    reducer: nullReducer,
    methodCreator: () =>
      createMethod((action) => {
        const { url, name } = selectPayload<LogixUXTriggerInstallGitRepositoryPayload>(action);
        const strategy = logixUXInstallGitRepositoryStrategy(url, name);
        return strategyBegin(strategy);
      }),
  });
/*#>*/
