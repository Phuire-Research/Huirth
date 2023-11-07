import { ActionStrategyStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { logixUXFooter } from '../qualities/footer.quality';

export const logixUXFooterStrategy: ActionStrategyStitch = () => {
  // HEAD
  const stepStitch = axium_createStitchNode();
  const stepLogixUXFooter = createActionNode(logixUXFooter(), {
    successNode: stepStitch,
    failureNode: null
  });
  return [stepStitch, createStrategy({
    topic: 'Create logixUX Header Content',
    initialNode: stepLogixUXFooter,
  })];
};