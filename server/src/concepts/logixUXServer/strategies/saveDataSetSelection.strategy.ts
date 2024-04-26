/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate a strategy that will save a selection of data sets by the passed parameter of names, to the file system, and to their own directory.
$>*/
/*<#*/
import { axiumLog, createActionNode, createStrategy } from 'stratimux';
import { TrainingData  } from '../../logixUX/logixUX.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { convertNamedDataSetToSaveFormat } from '../logixUXServer.model';
import { logixUXServerSendProjectStatusToSaved } from './client/logixUXServerSendUpdateProjectStatusToSaved.helper';

export const logixUXServerSaveDataSetSelectionStrategyTopic = 'Save a selection of data sets to their own directories';
export const logixUXServerSaveDataSetSelectionStrategy = (root: string, trainingData: TrainingData, names: string[]) => {
  const dataPaths = names.map(name => path.join(root + '/data/sets/' + name));
  let first;
  let previous;
  for (const [i, p] of dataPaths.entries()) {
    const name = names[i];
    const dataSet = (() => {
      let possible;
      for (const data of trainingData) {
        if (data.name === name) {
          possible = data;
          break;
        }
      }
      return possible;
    })();
    if (dataSet) {
      const saveFormat  = convertNamedDataSetToSaveFormat(dataSet);
      const stepUpdateProjectStatusToSavedOnClient = createActionNode(logixUXServerSendProjectStatusToSaved(dataSet.name));
      const stepCreateFileWithContents = createActionNode(fileSystemCreateFileWithContentsIndex({
        target: path.join(p + '/' + dataSet.name + '.json'),
        content: JSON.stringify(saveFormat)
      }));
      const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory({path: p}), {
        successNode: stepCreateFileWithContents,
        agreement: 20000
      });
      const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory({path: p}), {
        successNode: stepCreateDirectory,
        agreement: 20000
      });
      if (first === undefined) {
        first = stepRemoveDirectory;
        previous = stepUpdateProjectStatusToSavedOnClient;
      } else if (previous) {
        previous.successNode = stepRemoveDirectory;
        previous = stepUpdateProjectStatusToSavedOnClient;
      }
    }
  }
  if (first === undefined) {
    first = createActionNode(axiumLog());
    first.payload = {
      message: 'No data sets provided to save selection strategy'
    };
  }
  return createStrategy({
    topic: logixUXServerSaveDataSetSelectionStrategyTopic,
    initialNode: first,
  });
};
/*#>*/