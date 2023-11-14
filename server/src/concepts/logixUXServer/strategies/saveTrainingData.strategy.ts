import { createActionNode, createStrategy } from 'stratimux';
import { Active_DPO  } from '../../logixUX/logixUX.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { DPO_DataSet } from '../../../model/logixUX';

export const logixUXServerSaveTrainingDataStrategyTopic = 'Save training data currently loaded in state';
export const logixUXServerSaveTrainingDataStrategy = (root: string, trainingData: Active_DPO[]) => {
  console.log('BEFORE SAVE FORMAT', trainingData);
  const saveFormat: DPO_DataSet = {};
  trainingData.forEach((entry, i) => {
    saveFormat[entry.prompt + i] = {
      chosen: [{content: entry.chosen}],
      rejected: [{content: entry.chosen}],
    };
  });
  console.log('CHECK SAVE FORMAT', saveFormat);
  const dataPath = path.join(root + '/data/logixUX/');
  const stepCreateFileWithContents = createActionNode(fileSystemCreateFileWithContentsIndex({
    target: path.join(dataPath + 'data.json'),
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
    topic: logixUXServerSaveTrainingDataStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
