import { createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemGetDirectoriesAndFiles } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { logixUXServerReadFromDataTrainingDataFromDirectories } from '../qualities/readFromDataTrainingDataFromDirectory.quality';
import { logixUXServerTriggerSaveTrainingDataStrategy } from '../qualities/triggerSaveTrainingDataStrategy.quality';

const logixUXServerInitializationStrategyTopic = 'logixUX Server Initialization Strategy';
export const logixUXServerInitializationStrategy = (root: string) => {
  const dataDirectory = path.join(root + '/data/logixUX');
  const stepThree = createActionNode(logixUXServerTriggerSaveTrainingDataStrategy(), {
    successNode: null,
    failureNode: null
  });
  const stepTwo = createActionNode(logixUXServerReadFromDataTrainingDataFromDirectories(), {
    successNode: stepThree,
    failureNode: null
  });
  const stepOne = createActionNode(fileSystemGetDirectoriesAndFiles({path: dataDirectory}), {
    successNode: stepTwo,
    failureNode: null,
  });
  return createStrategy({
    topic: logixUXServerInitializationStrategyTopic,
    initialNode: stepOne,
  });
};
