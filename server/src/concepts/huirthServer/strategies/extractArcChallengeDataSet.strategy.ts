/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will clone a git repository to a target directory
$>*/
/*<#*/
import path from 'path';
import { createActionNode, createStrategy, Deck } from 'stratimux';
import { HuirthDeck } from '../../huirth/huirth.concept';
import { WebSocketServerDeck } from '../../webSocketServer/webSocketServer.concept';
import { HuirthServerDeck } from '../huirthServer.concept';
import { FileSystemDeck } from '../../fileSystem/fileSystem.concept';
import { DataSetTypes } from '../../huirth/huirth.model';

export const huirthServerExtractArcChallengeDataSetTopic = 'huirthServer Extract Arc Challenge Data Set';
export const huirthServerExtractArcChallengeDataSetStrategy = (
  root: string,
  deck: Deck<HuirthDeck & HuirthServerDeck & WebSocketServerDeck & FileSystemDeck>
) => {
  const url = 'https://github.com/fchollet/ARC-AGI';
  const dataPath = path.join(root + '/data/repos/ARC-AGI');
  const trainingDataPath = path.join(dataPath + '/data/training/');
  const evaluationDataPath = path.join(dataPath + '/data/evaluation/');
  // Step 3 Update status to installed by name as payload
  console.log('CLONING ', url);
  // const stepAppendParsedDataToNamedDataSetSilent = createActionNode(
  //   deck.huirthServer.e.huirthServerAppendParsedDataToNamedDataSetSilent({
  //     name: 'arcTraining',
  //     type: DataSetTypes.general,
  //   })
  // );
  const stepEvalParseArcChallengeAddToDataField = createActionNode(
    deck.huirthServer.e.huirthServerArcChallengeParseFileFromData({
      name: 'arcEvaluation',
      type: DataSetTypes.general,
    }),
    {
      // successNode: stepAppendParsedDataToNamedDataSetSilent,
    }
  );
  const stepEvalReadAllTrainingData = createActionNode(deck.fileSystem.e.fileSystemReadAllFileContentsAndAppendToData(), {
    successNode: stepEvalParseArcChallengeAddToDataField,
  });
  // Add Training Data Page
  // Add Parsed to TrainingData
  // Parse from Directory
  const stepEvalFilter = createActionNode(
    deck.fileSystem.e.fileSystemFilterFilesAndDirectories({
      isTokens: ['.json'],
      notTokens: [path.join('/context/')],
    }),
    {
      successNode: stepEvalReadAllTrainingData,
    }
  );
  const stepEvalReadTrainingDirectory = createActionNode(deck.fileSystem.e.fileSystemReadDirectory({ target: evaluationDataPath }), {
    // successNode: stepCreateDirectory,
    successNode: stepEvalFilter,
    agreement: 20000,
  });
  const stepParseArcChallengeAddToDataField = createActionNode(
    deck.huirthServer.e.huirthServerArcChallengeParseFileFromData({
      name: 'arcTraining',
      type: DataSetTypes.general,
    }),
    {
      // successNode: stepAppendParsedDataToNamedDataSetSilent,
      successNode: stepEvalReadTrainingDirectory,
    }
  );
  const stepReadAllTrainingData = createActionNode(deck.fileSystem.e.fileSystemReadAllFileContentsAndAppendToData(), {
    successNode: stepParseArcChallengeAddToDataField,
  });
  // Add Training Data Page
  // Add Parsed to TrainingData
  // Parse from Directory
  const stepFilter = createActionNode(
    deck.fileSystem.e.fileSystemFilterFilesAndDirectories({
      isTokens: ['.json'],
      notTokens: [path.join('/context/')],
    }),
    {
      successNode: stepReadAllTrainingData,
    }
  );
  const stepReadTrainingDirectory = createActionNode(deck.fileSystem.e.fileSystemReadDirectory({ target: trainingDataPath }), {
    // successNode: stepCreateDirectory,
    successNode: stepFilter,
    agreement: 20000,
  });
  // Step 2 Git clone into that directory by name
  const stepCloneRepo = createActionNode(
    deck.huirthServer.e.huirthServerGitCloneRepoToDirectory({
      url,
      path: dataPath,
    }),
    {
      successNode: stepReadTrainingDirectory,
      agreement: 600000,
    }
  );
  // Step 1 Remove directory if exists based on name
  const stepRemoveDirectory = createActionNode(deck.fileSystem.e.fileSystemRemoveTargetDirectory({ path: dataPath }), {
    successNode: stepCloneRepo,
    agreement: 60000,
  });
  return createStrategy({
    topic: huirthServerExtractArcChallengeDataSetTopic,
    initialNode: stepRemoveDirectory,
  });
};
/*#>*/
