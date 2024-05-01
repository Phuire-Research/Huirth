/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a ActionStrategy that will delete data sets from the file system.
$>*/
/*<#*/
import { axiumLog, axiumStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { huirthServerSendUpdateProjectToInstalled } from './client/huirthServerSendUpdateProjectToInstalled.helper';
import { DataSetTypes, TrainingData } from '../../huirth/huirth.model';

const huirthServerDeleteDataSetsStrategyTopic = 'huirthServer delete data sets from file system';
export const huirthServerDeleteDataSetsStrategy = (root: string, trainingData: TrainingData, names: string[]) => {
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
    const action = isProject ? huirthServerSendUpdateProjectToInstalled(name) : axiumStitch();
    if (first === undefined) {
      const updateStatus = createActionNode(action);
      first = createActionNode(fileSystemRemoveTargetDirectory({path: dataSetDirectory}), {
        successNode: updateStatus,
      });
      previous = updateStatus;
    } else if (previous) {
      const updateStatus = createActionNode(action);
      const next = createActionNode(fileSystemRemoveTargetDirectory({path: dataSetDirectory}), {
        successNode: updateStatus,
      });
      previous.successNode = next;
      previous = updateStatus;
    }
  }
  return createStrategy({
    topic: huirthServerDeleteDataSetsStrategyTopic,
    initialNode: first ? first : createActionNode(axiumLog(), { successNode: null, failureNode: null}),
  });
};
/*#>*/