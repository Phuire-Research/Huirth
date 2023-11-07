import {
  ActionStrategy,
  ActionStrategyParameters,
  axiumPreClose,
  createActionNode,
  createActionNodeFromStrategy,
  createStrategy
} from 'stratimux';
import { fileSystemCopyMoveTargetDirectory } from '../../fileSystem/qualities/copyMoveDirectory.quality';
import path from 'path';
import { ConceptAndProperties, Page } from '../../../model/userInterface';
import { userInterfaceServerRecursivelyCreateEachPageHtml } from '../qualities/recursivelyCreateEachPageHtml.quality';
import { userInterfaceServerPrepareContextConceptsStrategy } from './prepareContextConcepts.strategy';

export const userInterfaceServerPrepareStaticConceptsTopic = 'User Interface Server prepare Static Concepts';
export function userInterfaceServerPrepareStaticConceptsStrategy(
  root: string,
  conceptsAndProps: ConceptAndProperties[],
  unified: string[],
  initialDirectoryMap: string[],
  pages: Page[]
): ActionStrategy {
  const rootLayout = path.join(root + '/layout/');
  const rootLayoutStatic = path.join(root + '/layout/static/');
  const contextPublic = path.join(root + '/context/public/');
  // axium Close
  const stepEight = createActionNode(axiumPreClose({ exit: true}), {
    successNode: null,
    failureNode: null
  });
  const stepSeven = createActionNode(userInterfaceServerRecursivelyCreateEachPageHtml({targetDir: rootLayout, pages: [...pages]}), {
    successNode: stepEight,
    failureNode: null
  });
  const stepSix = createActionNode(fileSystemCopyMoveTargetDirectory({
    target: contextPublic,
    newLocation: rootLayoutStatic,
  }), {
    successNode: stepSeven,
    failureNode: null
  });
  const [stitchEnd, contextStrategy] = userInterfaceServerPrepareContextConceptsStrategy(
    root,
    conceptsAndProps,
    unified,
    initialDirectoryMap
  );
  stitchEnd.successNode = stepSix;
  const stepStart = createActionNodeFromStrategy(contextStrategy);

  const params: ActionStrategyParameters = {
    topic: userInterfaceServerPrepareStaticConceptsTopic,
    initialNode: stepStart,
  };

  return createStrategy(params);
}