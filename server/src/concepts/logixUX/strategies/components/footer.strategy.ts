import { ActionStrategyStitch, axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { logixUXFooter } from '../../qualities/components/footer.quality';
import { ActionStrategyComponentStitch } from '../../../../model/userInterface';

export const logixUXFooterStrategy: ActionStrategyComponentStitch = (payload) => {
  // HEAD
  const stepStitch = axium_createStitchNode();
  const stepLogixUXFooter = createActionNode(logixUXFooter(payload), {
    successNode: stepStitch,
    failureNode: null
  });
  return [stepStitch, createStrategy({
    topic: 'Create logixUX Header Content',
    initialNode: stepLogixUXFooter,
  })];
};