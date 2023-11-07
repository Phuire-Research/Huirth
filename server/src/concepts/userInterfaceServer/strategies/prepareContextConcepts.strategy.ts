import { ActionNode, ActionStrategy, ActionStrategyParameters, axiumLog, createActionNode, createStrategy } from 'stratimux';
import { fileSystemRemoveTargetDirectory } from '../../fileSystem/qualities/removeTargetDirectory.quality';
import path from 'path';
import {
  RecursivelyCopyMoveTargetDirectoriesPayload,
  fileSystemRecursivelyCopyMoveTargetDirectories
} from '../../fileSystem/qualities/recursivelyCopyMoveDirectories.quality';
import { userInterfaceServerBuildContext } from '../qualities/buildContext.quality';
import { ConceptAndProperties, PrimedConceptAndProperties } from '../../../model/userInterface';
import { userInterfaceServerCreateContextIndex } from '../qualities/createContextIndex.quality';
import { serverName } from '../../server/server.concept';
import { userInterfaceServerFormatContext } from '../qualities/formatContext.quality';

export const userInterfaceServerPrepareContextConceptsTopic = 'User Interface Server prepare Context Concepts';
export function userInterfaceServerPrepareContextConceptsStrategy(
  root: string,
  conceptsAndProps: ConceptAndProperties[],
  unifiedConcepts: string[],
  initialDirectoryMap: string[]
): [ActionNode, ActionStrategy] {
  const conceptNames = [];
  const directories: RecursivelyCopyMoveTargetDirectoriesPayload = [];
  const directoryMap: string[] = [];
  // Server only concepts should not be unified into the server concept
  // As the userInterface, is an interoperable concept between server and client
  // Therefore you should only unify what would be needed for both
  unifiedConcepts.forEach(name => {
    if (name !== serverName) {
      for (const directory of initialDirectoryMap) {
        if (directory === name) {
          directories.push({
            newLocation: path.join(root + '/context/src/concepts/' + name),
            target: path.join(root + '/server/src/concepts/' + name)
          });
          directoryMap.push(name);
          break;
        }
      }
    }
  });
  const primedConcepts: PrimedConceptAndProperties[] = conceptsAndProps.map(conceptAndProps => {
    conceptNames.push(conceptAndProps.name);
    for (const directory of initialDirectoryMap) {
      if (directory === conceptAndProps.name) {
        directories.push({
          newLocation: path.join(root + '/context/src/concepts/' + conceptAndProps.name),
          target: path.join(root + '/server/src/concepts/' + conceptAndProps.name)
        });
        directoryMap.push(conceptAndProps.name);
        break;
      }
    }
    return {
      name: conceptAndProps.name,
      nameCapitalized: conceptAndProps.name[0].toUpperCase() + conceptAndProps.name.substring(1),
      properties: conceptAndProps.properties
    };
  });
  const stepLog = createActionNode(axiumLog(), {
    successNode: null,
    failureNode: null
  });
  const stepFive = createActionNode(userInterfaceServerBuildContext({contextDir: path.join(root + '/context/')}), {
    successNode: null,
    failureNode: stepLog,
    agreement: 7000
  });
  const stepFour = createActionNode(userInterfaceServerFormatContext({contextDir: path.join(root + '/context/')}), {
    successNode: stepFive,
    failureNode: stepLog,
    agreement: 7000
  });
  const stepThree = createActionNode(userInterfaceServerCreateContextIndex({primedConcepts, root, directoryMap}), {
    successNode: stepFour,
    failureNode: null
  });
  const stepTwo = createActionNode(fileSystemRecursivelyCopyMoveTargetDirectories(directories), {
    successNode: stepThree,
    failureNode: null
  });
  const contextConcepts = path.join(root + '/context/src/concepts/');
  const stepOne = createActionNode(fileSystemRemoveTargetDirectory(contextConcepts), {
    successNode: stepTwo,
    failureNode: null,
    agreement: 20000
  });

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerPrepareContextConceptsTopic,
    initialNode: stepOne,
  };

  return [stepFive, createStrategy(params)];
}
