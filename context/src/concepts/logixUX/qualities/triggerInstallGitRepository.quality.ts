import {
  ActionType,
  Counter,
  MethodCreator,
  UnifiedSubject,
  createMethod,
  createMethodDebounceWithState,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { logixUXMinusSevenStrategy } from '../strategies/countMinusSeven.strategy';
import { logixUXInstallGitRepositoryStrategy } from '../strategies/installGitProject.strategy';

export type LogixUXTriggerInstallGitRepositoryPayload = {
  url: string;
  name: string;
};
export const logixUXTriggerInstallGitRepositoryType: ActionType = 'Create logixUX triggerInstallGitRepository';
export const logixUXTriggerInstallGitRepository = prepareActionWithPayloadCreator(logixUXTriggerInstallGitRepositoryType);

const createLogixUXTriggerInstallGitRepositoryMethodCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  createMethod((action) => {
    const { url, name } = selectPayload<LogixUXTriggerInstallGitRepositoryPayload>(action);
    const strategy = logixUXInstallGitRepositoryStrategy(url, name);
    return strategyBegin(strategy);
  });

export const logixUXTriggerInstallGitRepositoryQuality = createQuality(
  logixUXTriggerInstallGitRepositoryType,
  defaultReducer,
  createLogixUXTriggerInstallGitRepositoryMethodCreator
);
