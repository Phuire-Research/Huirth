import { createActionNode, createStrategy } from 'stratimux';
import { logixUXStyle } from '../../qualities/components/style.quality';
import { logixUXHead } from '../../qualities/components/head.quality';
import { ActionStrategyComponentStitch } from '../../../../model/userInterface';

export const logixUXHeaderStrategy: ActionStrategyComponentStitch = (payload) => {
  // HEAD
  const stepLogixUXStyle = createActionNode(logixUXStyle(payload), {
    successNode: null,
    failureNode: null
  });
  const stepLogixUXHead = createActionNode(logixUXHead(payload), {
    successNode: stepLogixUXStyle,
    failureNode: null
  });
  return [stepLogixUXStyle, createStrategy({
    topic: 'Create logixUX Header Content',
    initialNode: stepLogixUXHead,
  })];
};