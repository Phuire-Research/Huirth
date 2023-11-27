/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a ActionStrategy that will delete data sets from the file system.
$>*/
/*<#*/
import { axiumLog, createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';

const logixUXServerDeleteDataSetsStrategyTopic = 'logixUXServer delete data sets from file system';
export const logixUXServerDeleteDataSetsStrategy = (root: string, names: string[]) => {
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  let first;
  let previous;
  for (const name of names) {
    const dataSetDirectory = path.join(root + '/data/sets/' + name);
    if (first === undefined) {
      first = createActionNode(fileSystemRemoveTargetDirectory({path: dataSetDirectory}), {
        successNode: null,
        failureNode: null,
      });
      previous = first;
    } else if (previous) {
      const next = createActionNode(fileSystemRemoveTargetDirectory({path: dataSetDirectory}), {
        successNode: null,
        failureNode: null,
      });
      previous.successNode = next;
      previous = next;
    }
  }
  return createStrategy({
    topic: logixUXServerDeleteDataSetsStrategyTopic,
    initialNode: first ? first : createActionNode(axiumLog(), { successNode: null, failureNode: null}),
  });
};
/*#>*/