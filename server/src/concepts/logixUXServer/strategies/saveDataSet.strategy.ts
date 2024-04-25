/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a strategy that will save a selection of data sets by the passed parameter of names, to the file system, and to their own directory.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { NamedDataSet } from '../../logixUX/logixUX.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { convertNamedDataSetToSaveFormat } from '../logixUXServer.model';
import { logixUXServerSendUpdateParsedProjectData } from './client/logixUXServerSendUpdateParsedProjectData.helper';

export const logixUXServerSaveDataSetStrategyTopic = 'Save a data set to its own directory';
export const logixUXServerSaveDataSetStrategy = (root: string, dataSet: NamedDataSet, name: string) => {
  const dataPath = path.join(root + '/data/sets/' + name);
  const saveFormat  = convertNamedDataSetToSaveFormat(dataSet);
  const stepUpdateProjectUpdateParsedProjectDataToClient = createActionNode(logixUXServerSendUpdateParsedProjectData(dataSet));
  const stepCreateFileWithContents = createActionNode(fileSystemCreateFileWithContentsIndex({
    target: path.join(dataPath + '/' + dataSet.name + '.json'),
    content: JSON.stringify(saveFormat)
  }), {
    successNode: stepUpdateProjectUpdateParsedProjectDataToClient,
    agreement: 20000
  });
  const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory({path: dataPath}), {
    successNode: stepCreateFileWithContents,
    agreement: 20000
  });
  const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory({path: dataPath}), {
    successNode: stepCreateDirectory,
    agreement: 20000
  });
  return createStrategy({
    topic: logixUXServerSaveDataSetStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/