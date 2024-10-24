/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a strategy that will save a selection of data sets by the passed parameter of names, to the file system, and to their own directory.
$>*/
/*<#*/
import { Concepts, createActionNode, createActionNodeFromStrategy, createStrategy, Deck } from 'stratimux';
import { NamedDataSet } from '../../huirth/huirth.model';
import path from 'path';
import { convertNamedDataSetToSaveFormat } from '../huirthServer.model';
import { huirthServerSendUpdateParsedProjectData } from './client/huirthServerSendUpdateParsedProjectData.helper';
import { huirthGeneratedTrainingDataPageStrategy } from '../../huirth/strategies/pages/generatedTrainingDataPage.strategy';
import { huirthAddTrainingDataPageStrategy } from '../../huirth/strategies/addPageTrainingData.strategy';
import { HuirthServerDeck } from '../huirthServer.concept';

export const huirthServerSaveDataSetStrategyTopic = 'Save a data set to its own directory';
export const huirthServerSaveDataSetStrategy = (
  root: string,
  dataSet: NamedDataSet,
  name: string,
  concepts: Concepts,
  deck: Deck<HuirthServerDeck>
) => {
  // console.log('HITTING HERE');
  const dataPath = path.join(root + '/data/sets/' + name);
  const saveFormat = convertNamedDataSetToSaveFormat(dataSet);
  const generatedTrainingDataPage = huirthGeneratedTrainingDataPageStrategy(name, deck);
  const stepAdd = createActionNodeFromStrategy(huirthAddTrainingDataPageStrategy(name, generatedTrainingDataPage, concepts, deck));
  const stepUpdateProjectUpdateParsedProjectDataToClient = createActionNode(huirthServerSendUpdateParsedProjectData(dataSet, deck), {
    successNode: stepAdd,
  });
  const stepCreateFileWithContents = createActionNode(
    deck.fileSystem.e.fileSystemCreateFileWithContentsIndex({
      target: path.join(dataPath + '/' + dataSet.name + '.json'),
      content: JSON.stringify(saveFormat),
    }),
    {
      successNode: stepUpdateProjectUpdateParsedProjectDataToClient,
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
    topic: huirthServerSaveDataSetStrategyTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
