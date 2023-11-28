/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a strategy that will save a selection of data sets by the passed parameter of names, to the file system, and to their own directory.
$>*/
/*<#*/
import { axiumLog, createActionNode, createStrategy } from 'stratimux';
import { NamedDataSet, TrainingData  } from '../../logixUX/logixUX.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { convertNamedDataSetToSaveFormat } from '../logixUXServer.model';
import { logixUXServerSendProjectStatusToSaved } from './client/logixUXServerSendUpdateProjectStatusToSaved.helper';
import { logixUXServerSendUpdateParsedProjectData } from './client/logixUXServerSendUpdateParsedProjectData.helper';

export const logixUXServerSaveDataSetStrategyTopic = 'Save a data set to its own directory';
export const logixUXServerSaveDataSetStrategy = (root: string, dataSet: NamedDataSet, name: string) => {
  const dataPath = path.join(root + '/data/sets/' + name);
  const saveFormat  = convertNamedDataSetToSaveFormat(dataSet);
  const stepUpdateProjectUpdateParsedProjectDataToClient = createActionNode(logixUXServerSendUpdateParsedProjectData(dataSet), {
    successNode: null,
    failureNode: null
  });
  const stepCreateFileWithContents = createActionNode(fileSystemCreateFileWithContentsIndex({
    target: path.join(dataPath + '/' + dataSet.name + '.json'),
    content: JSON.stringify(saveFormat)
  }), {
    successNode: stepUpdateProjectUpdateParsedProjectDataToClient,
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
    topic: logixUXServerSaveDataSetStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/