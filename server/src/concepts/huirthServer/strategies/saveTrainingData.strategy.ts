/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a strategy that will save the currently loaded dataset into state.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { TrainingData } from '../../huirth/huirth.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { HuirthServerDeck } from '../huirthServer.concept';

export const huirthServerSaveTrainingDataStrategyTopic = 'Save training data currently loaded in state';
export const huirthServerSaveTrainingDataStrategy = (root: string, deck: Deck<HuirthServerDeck>) => {
  const dataPath = path.join(root + '/data/huirth/');
  // Still need to create the rest of the steps here.
  const stepCreateDirectory = createActionNode(deck.fileSystem.e.fileSystemCreateTargetDirectory({ path: dataPath }), {
    agreement: 20000,
  });
  const stepRemoveDirectory = createActionNode(deck.fileSystem.e.fileSystemRemoveTargetDirectory({ path: dataPath }), {
    successNode: stepCreateDirectory,
    agreement: 20000,
  });
  return createStrategy({
    topic: huirthServerSaveTrainingDataStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
