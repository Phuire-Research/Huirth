/*<$
For the framework Stratimux and a Concept logixUX Server, generate a strategy that will save the current DPO data onto the file system.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { Active_DPO  } from '../../logixUX/logixUX.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { DPO_DataSet } from '../../../model/logixUX';
import { SavedFormat, convertDPOToSaveFormatDPO } from '../logixUXServer.model';

export const logixUXServerSaveDPOStrategyTopic = 'Save training data currently loaded in state';
export const logixUXServerSaveDPOStrategy = (root: string, DPO: Active_DPO[]) => {
  console.log('BEFORE SAVE FORMAT', DPO);
  const saveFormat: SavedFormat = convertDPOToSaveFormatDPO(DPO);
  console.log('CHECK SAVE FORMAT', saveFormat);
  const dataPath = path.join(root + '/data/logixUX/');
  const stepCreateFileWithContents = createActionNode(fileSystemCreateFileWithContentsIndex({
    target: path.join(dataPath + 'dpo.json'),
    content: JSON.stringify(saveFormat)
  }), {
    successNode: null,
    failureNode: null,
    agreement: 20000
  });
  const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory({path: dataPath}), {
    successNode: stepCreateFileWithContents,
    failureNode: null,
    agreement: 20000
  });
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory({path: dataPath}), {
    successNode: stepCreateDirectory,
    failureNode: null,
    agreement: 20000
  });
  return createStrategy({
    topic: logixUXServerSaveDPOStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
