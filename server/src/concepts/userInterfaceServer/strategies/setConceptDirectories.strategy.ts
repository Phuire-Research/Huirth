import { ActionStrategy, ActionStrategyParameters, createActionNode, createStrategy } from 'stratimux';
import { fileSystemGetDirectories } from '../../fileSystem/qualities/getDirectories.quality';
import path from 'path';
import { fileSystemServerSetConceptDirectoriesFromData } from '../../fileSystem/qualities/setConceptDirectoriesFromData.quality';

export const userInterfaceServerSetConceptDirectoriesFromDataTopic = 'User Interface Server set Concept Directories from Data';
export function userInterfaceServerSetConceptDirectoriesFromDataStrategy(root: string): ActionStrategy {
  const stepTwo = createActionNode(fileSystemServerSetConceptDirectoriesFromData(), {
    successNode: null,
    failureNode: null
  });
  const conceptDirectory = path.join(root + '/server/src/concepts');
  const stepOne = createActionNode(fileSystemGetDirectories({path: conceptDirectory}), {
    successNode: stepTwo,
    failureNode: null,
  });

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerSetConceptDirectoriesFromDataTopic,
    initialNode: stepOne,
  };

  return createStrategy(params);
}