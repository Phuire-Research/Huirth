/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a strategy that will save the current DPO data onto the file system.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { Active_DPO } from '../../huirth/huirth.model';
import path from 'path';
import { SavedFormat, convertDPOToSaveFormatDPO } from '../huirthServer.model';
import { HuirthServerDeck } from '../huirthServer.concept';

export const huirthServerSaveDPOStrategyTopic = 'Save training data currently loaded in state';
export const huirthServerSaveDPOStrategy = (root: string, DPO: Active_DPO[], deck: Deck<HuirthServerDeck>) => {
  const saveFormat: SavedFormat = convertDPOToSaveFormatDPO(DPO);
  const dataPath = path.join(root + '/data/huirth/');
  const stepCreateFileWithContents = createActionNode(
    deck.fileSystem.e.fileSystemCreateFileWithContentsIndex({
      target: path.join(dataPath + 'dpo.json'),
      content: JSON.stringify(saveFormat),
    }),
    {
      agreement: 20000,
    }
  );
  const stepCreateDirectory = createActionNode(deck.fileSystem.e.fileSystemCreateTargetDirectory({ path: dataPath }), {
    successNode: stepCreateFileWithContents,
    agreement: 20000,
  });
  const stepRemoveDirectory = createActionNode(deck.fileSystem.e.fileSystemRemoveTargetDirectory({ path: dataPath }), {
    successNode: stepCreateDirectory,
    agreement: 20000,
  });
  return createStrategy({
    topic: huirthServerSaveDPOStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
