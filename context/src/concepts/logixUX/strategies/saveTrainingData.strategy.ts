import { createActionNode, createStrategy } from 'stratimux';
import { Active_DPO } from '../logixUX.model';
import { DPO_DataSet } from '../../../model/logixUX';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';

export const logixUXSaveTrainingDataStrategyTopic = 'Save training data currently loaded in state';
export const logixUXSaveTrainingDataStrategy = (root: string, trainingData: Active_DPO[]) => {
  const saveFormat: DPO_DataSet = {};
  trainingData.forEach(entry => {
    saveFormat[entry.prompt] = {
      chosen: [{content: entry.chosen}],
      rejected: [{content: entry.chosen}],
    };
  });
  const dataPath = path.join(root + '/data/logixUX/');
  const stepCreateFileWithContents = createActionNode(fileSystemCreateFileWithContentsIndex({
    target: dataPath,
    content: JSON.stringify(saveFormat)
  }), {
    successNode: null,
    failureNode: null,
    agreement: 20000
  });
  const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory(dataPath), {
    successNode: stepCreateFileWithContents,
    failureNode: null,
    agreement: 20000
  });
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory(dataPath), {
    successNode: stepCreateDirectory,
    failureNode: null,
    agreement: 20000
  });
  return createStrategy({
    topic: logixUXSaveTrainingDataStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
