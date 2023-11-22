/*<$
For the framework Stratimux and a Concept logixUX Server, generate a strategy that will read an installed repository in the data directory and parse it into a data set to be loaded into state.
$>*/
/*<#*/
import { ActionNode, ActionStrategy, ActionStrategyStitch, createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemReadDirectory } from '../../fileSystem/qualities/readDir.quality';
import { logixUXServerParseFileFromData } from '../qualities/parseFileFromData.quality';
import { fileSystemFilterFilesAndDirectories } from '../../fileSystem/qualities/filterFilesAndDirectories.quality';
import { fileSystemReadFileContentsAndAppendToData } from '../../fileSystem/qualities/readFileContentsAndAppendToData.quality';
import { logixUXServerDetermineReadParseAppendStrategy } from '../qualities/determineReadParseAppendStrategy.quality';

export const logixUXServerParseRepositoryTopic = 'logixUXServer read Repository, then parse the contents into a DataSet';
export const logixUXServerParseRepositoryStrategy = (root: string, name:string) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  // Generate parse files and add them all to an array to be added to state at the end.
  const stepDetermineReadAndParseStrategy = createActionNode(logixUXServerDetermineReadParseAppendStrategy({
    name,
  }), {
    successNode: null,
    failureNode: null
  });
  // Step 1 Remove directory if exists based on name
  const stepFilter = createActionNode(fileSystemFilterFilesAndDirectories({
    isTokens: ['.ts'],
    notTokens: [path.join('/context/')]
  }), {
    successNode: stepDetermineReadAndParseStrategy,
    failureNode: null
  });
  const stepReadDirectory = createActionNode(fileSystemReadDirectory({target: dataPath}), {
    // successNode: stepCreateDirectory,
    successNode: stepFilter,
    failureNode: null,
    agreement: 20000
  });
  return createStrategy({
    topic: logixUXServerParseRepositoryTopic,
    initialNode: stepReadDirectory,
  });
};
/*#>*/