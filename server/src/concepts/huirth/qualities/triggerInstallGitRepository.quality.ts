/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that will trigger the strategy that will install the target git repository via a supplied url to a directory of the given name.
$>*/
/*<#*/
import { createMethod, createQualityCardWithPayload, nullReducer, selectPayload, strategyBegin } from 'stratimux';
import { huirthInstallGitRepositoryStrategy } from '../strategies/installGitProject.strategy';
import { HuirthDeck, huirthState } from '../huirth.concept';

export type huirthTriggerInstallGitRepositoryPayload = {
  url: string;
  name: string;
};

export const huirthTriggerInstallGitRepository = createQualityCardWithPayload<
  huirthState,
  huirthTriggerInstallGitRepositoryPayload,
  HuirthDeck
>({
  type: 'Create huirth trigger install git repository',
  reducer: nullReducer,
  methodCreator: () =>
    createMethod(({ action, deck }) => {
      const { url, name } = action.payload;
      const strategy = huirthInstallGitRepositoryStrategy(url, name, deck);
      return strategyBegin(strategy);
    }),
});
/*#>*/
