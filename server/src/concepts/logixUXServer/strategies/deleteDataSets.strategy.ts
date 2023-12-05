/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a ActionStrategy that will delete data sets from the file system.
$>*/
/*<#*/
import { axiumLog, axiumStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { logixUXServerSendUpdateProjectToInstalled } from './client/logixUXServerSendUpdateProjectToInstalled.helper';
import { DataSetTypes, TrainingData } from '../../logixUX/logixUX.model';

const logixUXServerDeleteDataSetsStrategyTopic = 'logixUXServer delete data sets from file system';
export const logixUXServerDeleteDataSetsStrategy = (root: string, trainingData: TrainingData, names: string[]) => {
  // If repositories doesn't exist
  // stepFour does folder repositories exists?
  let first;
  let previous;
  for (const name of names) {
    const dataSetDirectory = path.join(root + '/data/sets/' + name);
    const isProject = (() => {
      for (const data of trainingData) {
        if (data.name === name) {
          return data.type === DataSetTypes.project;
        }
      }
      return false;
    })();
    const action = isProject ? logixUXServerSendUpdateProjectToInstalled(name) : axiumStitch();
    if (first === undefined) {
      const updateStatus = createActionNode(action, {
        successNode: null,
        failureNode: null
      });
      first = createActionNode(fileSystemRemoveTargetDirectory({path: dataSetDirectory}), {
        successNode: updateStatus,
        failureNode: null,
      });
      previous = updateStatus;
    } else if (previous) {
      const updateStatus = createActionNode(action, {
        successNode: null,
        failureNode: null
      });
      const next = createActionNode(fileSystemRemoveTargetDirectory({path: dataSetDirectory}), {
        successNode: updateStatus,
        failureNode: null,
      });
      previous.successNode = next;
      previous = updateStatus;
    }
  }
  return createStrategy({
    topic: logixUXServerDeleteDataSetsStrategyTopic,
    initialNode: first ? first : createActionNode(axiumLog(), { successNode: null, failureNode: null}),
  });
};
/*#>*/