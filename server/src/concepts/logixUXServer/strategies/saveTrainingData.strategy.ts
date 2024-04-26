/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a strategy that will save the currently loaded dataset into state.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { TrainingData  } from '../../logixUX/logixUX.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';

export const logixUXServerSaveTrainingDataStrategyTopic = 'Save training data currently loaded in state';
export const logixUXServerSaveTrainingDataStrategy = (root: string) => {
  const dataPath = path.join(root + '/data/logixUX/');
  // Still need to create the rest of the steps here.
  const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory({path: dataPath}), {
    agreement: 20000
  });
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory({path: dataPath}), {
    successNode: stepCreateDirectory,
    agreement: 20000
  });
  return createStrategy({
    topic: logixUXServerSaveTrainingDataStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/