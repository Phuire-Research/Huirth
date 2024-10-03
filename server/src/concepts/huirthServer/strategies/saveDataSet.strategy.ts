/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a strategy that will save a selection of data sets by the passed parameter of names, to the file system, and to their own directory.
$>*/
/*<#*/
import { Concepts, createActionNode, createActionNodeFromStrategy, createStrategy } from 'stratimux';
import { NamedDataSet } from '../../huirth/huirth.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { convertNamedDataSetToSaveFormat } from '../huirthServer.model';
import { huirthServerSendUpdateParsedProjectData } from './client/huirthServerSendUpdateParsedProjectData.helper';
import { huirthGeneratedTrainingDataPageStrategy } from '../../huirth/strategies/pages/generatedTrainingDataPage.strategy';
import { huirthAddTrainingDataPageStrategy } from '../../huirth/strategies/addPageTrainingData.strategy';

export const huirthServerSaveDataSetStrategyTopic = 'Save a data set to its own directory';
export const huirthServerSaveDataSetStrategy = (root: string, dataSet: NamedDataSet, name: string, concepts: Concepts) => {
  // console.log('HITTING HERE');
  const dataPath = path.join(root + '/data/sets/' + name);
  const saveFormat = convertNamedDataSetToSaveFormat(dataSet);
  const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(name);
  const stepAdd = createActionNodeFromStrategy(huirthAddTrainingDataPageStrategy(name, generatedTrainingDataPage, concepts));
  const stepUpdateProjectUpdateParsedProjectDataToClient = createActionNode(huirthServerSendUpdateParsedProjectData(dataSet), {
    successNode: stepAdd,
  });
  const stepCreateFileWithContents = createActionNode(
    fileSystemCreateFileWithContentsIndex.actionCreator({
      target: path.join(dataPath + '/' + dataSet.name + '.json'),
      content: JSON.stringify(saveFormat),
    }),
    {
      successNode: stepUpdateProjectUpdateParsedProjectDataToClient,
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
    topic: huirthServerSaveDataSetStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
