/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate an ActionStrategy the composes the prepare context concepts stich as its beginning the prepares a static deployment.
By create all the necessary page html files and moving context directories that those fils would utilize in production.
$>*/
/*<#*/
import {
  ActionStrategy,
  ActionStrategyParameters,
  MuxiumDeck,
  createActionNode,
  createActionNodeFromStrategy,
  createStrategy,
  Deck,
} from 'stratimux';
import path from 'path';
import { ConceptAndProperties, Page } from '../../../model/userInterface';
import { userInterfaceServerPrepareContextConceptsStitch } from './prepareContextConcepts.strategy';
import { UserInterfaceServerDeck } from '../userInterfaceServer.concept';
import { FileSystemDeck } from '../../fileSystem/fileSystem.concept';

export const userInterfaceServerPrepareStaticConceptsTopic = 'User Interface Server prepare Static Concepts';
export function userInterfaceServerPrepareStaticConceptsStrategy(
  root: string,
  conceptsAndProps: ConceptAndProperties[],
  unified: string[],
  initialDirectoryMap: string[],
  pages: Page[],
  deck: Deck<MuxiumDeck & UserInterfaceServerDeck & FileSystemDeck>
): ActionStrategy {
  const rootLayout = path.join(root + '/layout/');
  const rootLayoutStatic = path.join(root + '/layout/static/');
  const contextPublic = path.join(root + '/context/public/');
  // muxium Close
  const stepCloseProcess = createActionNode(deck.muxium.e.muxiumPreClose({ exit: true }));
  const stepRecursivelyCreatePageHtml = createActionNode(
    deck.userInterfaceServer.e.userInterfaceServerRecursivelyCreateEachPageHtml({ targetDir: rootLayout, pages: [...pages] }),
    {
      successNode: stepCloseProcess,
    }
  );
  const stepCopyMovePublicToLayout = createActionNode(
    deck.fileSystem.e.fileSystemCopyMoveTargetDirectory({
      target: contextPublic,
      newLocation: rootLayoutStatic,
    }),
    {
      successNode: stepRecursivelyCreatePageHtml,
    }
  );
  const [stitchEnd, contextStrategy] = userInterfaceServerPrepareContextConceptsStitch(
    root,
    conceptsAndProps,
    unified,
    initialDirectoryMap,
    deck
  );
  stitchEnd.successNode = stepCopyMovePublicToLayout;
  const stepStart = createActionNodeFromStrategy(contextStrategy);

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerPrepareStaticConceptsTopic,
    initialNode: stepStart,
  };

  return createStrategy(params);
}
