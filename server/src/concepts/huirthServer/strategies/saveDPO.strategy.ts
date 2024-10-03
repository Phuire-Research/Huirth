/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a strategy that will save the current DPO data onto the file system.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { Active_DPO } from '../../huirth/huirth.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { SavedFormat, convertDPOToSaveFormatDPO } from '../huirthServer.model';

export const huirthServerSaveDPOStrategyTopic = 'Save training data currently loaded in state';
export const huirthServerSaveDPOStrategy = (root: string, DPO: Active_DPO[]) => {
  const saveFormat: SavedFormat = convertDPOToSaveFormatDPO(DPO);
  const dataPath = path.join(root + '/data/huirth/');
  const stepCreateFileWithContents = createActionNode(
    fileSystemCreateFileWithContentsIndex.actionCreator({
      target: path.join(dataPath + 'dpo.json'),
      content: JSON.stringify(saveFormat),
    }),
    {
      agreement: 20000,
    }
  );
  const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory.actionCreator({ path: dataPath }), {
    successNode: stepCreateFileWithContents,
    agreement: 20000,
  });
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory.actionCreator({ path: dataPath }), {
    successNode: stepCreateDirectory,
    agreement: 20000,
  });
  return createStrategy({
    topic: huirthServerSaveDPOStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
