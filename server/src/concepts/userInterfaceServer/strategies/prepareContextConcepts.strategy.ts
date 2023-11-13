import { ActionNode, ActionStrategy, ActionStrategyParameters, Concept, axiumLog, createActionNode, createStrategy } from 'stratimux';
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
import { webSocketClientName } from '../../webSocketClient/webSocketClient.concept';

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
  const contextConcepts = path.join(root + '/context/src/concepts/');
  const contextModel = path.join(root + '/context/src/model/');
  const modelDirectory = {
    name: 'model',
    newLocation: path.join(root + '/context/src/model/'),
    target: path.join(root + '/server/src/model/')
  };
  // Server only concepts should not be unified into the server concept
  // As the userInterface, is an interoperable concept between server and client
  // Therefore you should only unify what would be needed for both
  unifiedConcepts.forEach(name => {
    if (!name.toLowerCase().includes(serverName.toLowerCase())) {
      for (const directory of initialDirectoryMap) {
        if (directory === name) {
          directories.push({
            name,
            newLocation: path.join(root + '/context/src/concepts/' + name),
            target: path.join(root + '/server/src/concepts/' + name)
          });
          break;
        }
      }
    }
  });
  const primedConcepts: PrimedConceptAndProperties[] = conceptsAndProps.map(conceptAndProps => {
    conceptNames.push(conceptAndProps.name);
    for (const directory of initialDirectoryMap) {
      const isSet = directories.filter(d => d.name === conceptAndProps.name).length > 0;
      if (directory === conceptAndProps.name && !isSet) {
        directories.push({
          name: conceptAndProps.name,
          newLocation: path.join(root + '/context/src/concepts/' + conceptAndProps.name),
          target: path.join(root + '/server/src/concepts/' + conceptAndProps.name)
        });
      }
      if (directory === conceptAndProps.name) {
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
  directories.push({
    name: webSocketClientName,
    newLocation: path.join(root + '/context/src/concepts/' + webSocketClientName),
    target: path.join(root + '/server/src/concepts/' + webSocketClientName)
  });
  const stepLog = createActionNode(axiumLog(), {
    successNode: null,
    failureNode: null
  });
  const stepContextBuild = createActionNode(userInterfaceServerBuildContext({contextDir: path.join(root + '/context/')}), {
    successNode: null,
    failureNode: stepLog,
    agreement: 7000
  });
  const stepContextFormat = createActionNode(userInterfaceServerFormatContext({contextDir: path.join(root + '/context/')}), {
    successNode: stepContextBuild,
    failureNode: stepLog,
    agreement: 7000
  });
  const stepCreateContextIndex = createActionNode(userInterfaceServerCreateContextIndex({
    primedConcepts,
    root,
    directoryMap
  }), {
    successNode: stepContextFormat,
    failureNode: null
  });
  const stepCopyMoveModel = createActionNode(fileSystemRecursivelyCopyMoveTargetDirectories([modelDirectory]), {
    successNode: stepCreateContextIndex,
    failureNode: null
  });
  const stepContextModelRemove = createActionNode(fileSystemRemoveTargetDirectory(contextModel), {
    successNode: stepCopyMoveModel,
    failureNode: null,
    agreement: 20000
  });
  const stepCopyMoveConcepts = createActionNode(fileSystemRecursivelyCopyMoveTargetDirectories(directories), {
    successNode: stepContextModelRemove,
    failureNode: null
  });
  const stepContextConceptRemove = createActionNode(fileSystemRemoveTargetDirectory(contextConcepts), {
    successNode: stepCopyMoveConcepts,
    failureNode: null,
    agreement: 20000
  });

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerPrepareContextConceptsTopic,
    initialNode: stepContextConceptRemove,
  };

  return [stepContextBuild, createStrategy(params)];
}
