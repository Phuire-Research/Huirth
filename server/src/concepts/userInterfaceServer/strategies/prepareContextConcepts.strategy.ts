/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a strategy stitch that will assemble the context directory to contain the necessary concepts dictated by the generated index file.
$>*/
/*<#*/
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
import { webSocketClientName } from '../../webSocketClient/webSocketClient.concept';

export const userInterfaceServerPrepareContextConceptsTopic = 'User Interface Server prepare Context Concepts';
export function userInterfaceServerPrepareContextConceptsStitch(
  root: string,
  conceptsAndProps: ConceptAndProperties[],
  unifiedConcepts: string[],
  initialDirectoryMap: string[]
): [ActionNode, ActionStrategy] {
  const conceptNames = [];
  const copyMovePayload: RecursivelyCopyMoveTargetDirectoriesPayload = {
    directories: []
  };
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
          copyMovePayload.directories.push({
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
      const isSet = copyMovePayload.directories.filter(d => d.name === conceptAndProps.name).length > 0;
      if (directory === conceptAndProps.name && !isSet) {
        copyMovePayload.directories.push({
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
  copyMovePayload.directories.push({
    name: webSocketClientName,
    newLocation: path.join(root + '/context/src/concepts/' + webSocketClientName),
    target: path.join(root + '/server/src/concepts/' + webSocketClientName)
  });
  const stepLog = createActionNode(axiumLog());
  const stepContextBuild = createActionNode(userInterfaceServerBuildContext({contextDir: path.join(root + '/context/')}), {
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
  });
  const stepCopyMoveModel = createActionNode(fileSystemRecursivelyCopyMoveTargetDirectories({directories: [modelDirectory]}), {
    successNode: stepCreateContextIndex,
  });
  const stepContextModelRemove = createActionNode(fileSystemRemoveTargetDirectory({path: contextModel}), {
    successNode: stepCopyMoveModel,
    agreement: 20000
  });
  const stepCopyMoveConcepts = createActionNode(fileSystemRecursivelyCopyMoveTargetDirectories(copyMovePayload), {
    successNode: stepContextModelRemove,
  });
  const stepContextConceptRemove = createActionNode(fileSystemRemoveTargetDirectory({path: contextConcepts}), {
    successNode: stepCopyMoveConcepts,
    agreement: 20000
  });

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerPrepareContextConceptsTopic,
    initialNode: stepContextConceptRemove,
  };

  return [stepContextBuild, createStrategy(params)];
}
/*#>*/