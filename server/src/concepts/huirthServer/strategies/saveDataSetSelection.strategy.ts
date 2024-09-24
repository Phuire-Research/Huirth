/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a strategy that will save a selection of data sets by the passed parameter of names, to the file system, and to their own directory.
$>*/
/*<#*/
import { axiumLog, createActionNode, createStrategy } from '@phuire/stratimux';
import { TrainingData } from '../../huirth/huirth.model';
import path from 'path';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from '../../fileSystem/qualities/createTargetDirectory.quality';
import { fileSystemCreateFileWithContentsIndex } from '../../fileSystem/qualities/createFileWithContents.quality';
import { convertNamedDataSetToSaveFormat } from '../huirthServer.model';
import { huirthServerSendProjectStatusToSaved } from './client/huirthServerSendUpdateProjectStatusToSaved.helper';

export const huirthServerSaveDataSetSelectionStrategyTopic = 'Save a selection of data sets to their own directories';
export const huirthServerSaveDataSetSelectionStrategy = (root: string, trainingData: TrainingData, names: string[]) => {
  const dataPaths = names.map((name) => path.join(root + '/data/sets/' + name));
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
      const saveFormat = convertNamedDataSetToSaveFormat(dataSet);
      const stepUpdateProjectStatusToSavedOnClient = createActionNode(huirthServerSendProjectStatusToSaved(dataSet.name));
      const stepCreateFileWithContents = createActionNode(
        fileSystemCreateFileWithContentsIndex.actionCreator({
          target: path.join(p + '/' + dataSet.name + '.json'),
          content: JSON.stringify(saveFormat),
        }),
        {
          successNode: stepUpdateProjectStatusToSavedOnClient,
        }
      );
      const stepCreateDirectory = createActionNode(fileSystemCreateTargetDirectory.actionCreator({ path: p }), {
        successNode: stepCreateFileWithContents,
        agreement: 20000,
      });
      const stepRemoveDirectory = createActionNode(fileSystemRemoveTargetDirectory.actionCreator({ path: p }), {
        successNode: stepCreateDirectory,
        agreement: 20000,
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
    first = createActionNode(axiumLog.actionCreator());
    first.payload = {
      message: 'No data sets provided to save selection strategy',
    };
  }
  return createStrategy({
    topic: huirthServerSaveDataSetSelectionStrategyTopic,
    initialNode: first,
  });
};
/*#>*/
