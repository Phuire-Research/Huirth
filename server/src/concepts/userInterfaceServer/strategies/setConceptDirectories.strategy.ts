/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will generate a new strategy that will atomically update the composition currently loaded in the pages property.
$>*/
/*<#*/
import { ActionStrategy, ActionStrategyParameters, AxiumDeck, axiumLog, createActionNode, createStrategy, Deck } from '@phuire/stratimux';
import { fileSystemGetDirectories } from '../../fileSystem/qualities/getDirectories.quality';
import path from 'path';
import { fileSystemServerSetConceptDirectoriesFromData } from '../../fileSystem/qualities/setConceptDirectoriesFromData.quality';

export const userInterfaceServerSetConceptDirectoriesFromDataTopic = 'User Interface Server set Concept Directories from Data';
export function userInterfaceServerSetConceptDirectoriesFromDataStrategy(root: string, deck: Deck<AxiumDeck>): ActionStrategy {
  const stepTwo = createActionNode(fileSystemServerSetConceptDirectoriesFromData(), {
    failureNode: createActionNode(deck.axium.e.axiumLog()),
  });
  const conceptDirectory = path.join(root + '/server/src/concepts');
  const stepOne = createActionNode(fileSystemGetDirectories({ path: conceptDirectory }), {
    successNode: stepTwo,
    failureNode: createActionNode(deck.axium.e.axiumLog()),
  });

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerSetConceptDirectoriesFromDataTopic,
    initialNode: stepOne,
  };

  return createStrategy(params);
}
