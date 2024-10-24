/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a quality that will generate a new strategy that will atomically update the composition currently loaded in the pages property.
$>*/
/*<#*/
import { ActionStrategy, ActionStrategyParameters, MuxiumDeck, muxiumLog, createActionNode, createStrategy, Deck } from 'stratimux';
import path from 'path';
import { FileSystemDeck } from '../../fileSystem/fileSystem.concept';

export const userInterfaceServerSetConceptDirectoriesFromDataTopic = 'User Interface Server set Concept Directories from Data';
export function userInterfaceServerSetConceptDirectoriesFromDataStrategy(
  root: string,
  deck: Deck<MuxiumDeck & FileSystemDeck>
): ActionStrategy {
  const stepTwo = createActionNode(deck.fileSystem.e.fileSystemServerSetConceptDirectoriesFromData(), {
    failureNode: createActionNode(deck.muxium.e.muxiumLog()),
  });
  const conceptDirectory = path.join(root + '/server/src/concepts');
  const stepOne = createActionNode(deck.fileSystem.e.fileSystemGetDirectories({ path: conceptDirectory }), {
    successNode: stepTwo,
    failureNode: createActionNode(deck.muxium.e.muxiumLog()),
  });

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerSetConceptDirectoriesFromDataTopic,
    initialNode: stepOne,
  };

  return createStrategy(params);
}
