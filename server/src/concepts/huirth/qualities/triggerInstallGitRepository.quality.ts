/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the strategy that will install the target git repository via a supplied url to a directory of the given name.
$>*/
/*<#*/
import { createMethod, createQualityCardWithPayload, nullReducer, selectPayload, strategyBegin } from '@phuire/stratimux';
import { huirthInstallGitRepositoryStrategy } from '../strategies/installGitProject.strategy';
import { huirthState } from '../huirth.concept';

export type huirthTriggerInstallGitRepositoryPayload = {
  url: string;
  name: string;
};

export const huirthTriggerInstallGitRepository =
  createQualityCardWithPayload<huirthState, huirthTriggerInstallGitRepositoryPayload>({
    type: 'Create huirth trigger install git repository',
    reducer: nullReducer,
    methodCreator: () =>
      createMethod((action) => {
        const { url, name } = action.payload;
        const strategy = huirthInstallGitRepositoryStrategy(url, name);
        return strategyBegin(strategy);
      }),
  });
/*#>*/
