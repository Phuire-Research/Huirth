import { axiumLog, createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemReadDirectory } from '../../fileSystem/qualities/readDir.quality';
import { logixUXServerParseFileFromData } from '../qualities/parseFileFromData.quality';

export const logixUXServerParseRepositoryTopic = 'logixUXServer read Repository, then parse the contents into a DataSet';
export const logixUXServerParseRepositoryStrategy = (root: string, name:string) => {
  const dataPath = path.join(root + '/data/repositories/' + name);
  // Generate parse files and add them all to an array to be added to state at the end.
  const stepParseFile = createActionNode(logixUXServerParseFileFromData(), {
    successNode: null,
    // TODO: If failed we can use open to load a window with the git install webpage
    failureNode: null,
  });
  // Step 1 Remove directory if exists based on name
  const stepReadDirectory = createActionNode(fileSystemReadDirectory({target: dataPath}), {
    // successNode: stepCreateDirectory,
    successNode: stepParseFile,
    failureNode: null,
    agreement: 20000
  });
  return createStrategy({
    topic: logixUXServerParseRepositoryTopic,
    initialNode: stepReadDirectory,
  });
};