/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a strategy that will read an installed repository in the data directory and parse it into a data set to be loaded into state.
$>*/
/*<#*/
import { createActionNode, createStrategy, Deck } from 'stratimux';
import path from 'path';
import { fileSystemReadDirectory } from '../../fileSystem/qualities/readDir.quality';
import { fileSystemFilterFilesAndDirectories } from '../../fileSystem/qualities/filterFilesAndDirectories.quality';
import { huirthServerDetermineReadParseAppendStrategy } from '../qualities/determineReadParseAppendStrategy.quality';
import { DataSetTypes } from '../../huirth/huirth.model';
import { HuirthServerDeck } from '../huirthServer.concept';

export const huirthServerParseRepositoryTopic = 'huirthServer read Repository, then parse the contents into a DataSet';
export const huirthServerParseRepositoryStrategy = (root: string, name: string, deck: Deck<HuirthServerDeck>) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  // Generate parse files and add them all to an array to be added to state at the end.
  const stepDetermineReadAndParseStrategy = createActionNode(
    deck.huirthServer.e.huirthServerDetermineReadParseAppendStrategy({
      name,
      type: DataSetTypes.project,
    })
  );
  // Step 1 Remove directory if exists based on name
  const stepFilter = createActionNode(
    deck.fileSystem.e.fileSystemFilterFilesAndDirectories({
      isTokens: ['.ts'],
      notTokens: [path.join('/context/')],
    }),
    {
      successNode: stepDetermineReadAndParseStrategy,
    }
  );
  const stepReadDirectory = createActionNode(deck.fileSystem.e.fileSystemReadDirectory({ target: dataPath }), {
    // successNode: stepCreateDirectory,
    successNode: stepFilter,
    agreement: 20000,
  });
  return createStrategy({
    topic: huirthServerParseRepositoryTopic,
    initialNode: stepReadDirectory,
  });
};
/*#>*/
