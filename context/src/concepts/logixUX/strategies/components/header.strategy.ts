import { ActionStrategyStitch, createActionNode, createStrategy } from 'stratimux';
import { logixUXStyle } from '../../qualities/components/style.quality';
import { logixUXHead } from '../../qualities/components/head.quality';

export const logixUXHeaderStrategy: ActionStrategyStitch = () => {
  // HEAD
  const stepLogixUXStyle = createActionNode(logixUXStyle(), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXHead = createActionNode(logixUXHead(), {
    successNode: stepLogixUXStyle,
    failureNode: null,
  });
  return [
    stepLogixUXStyle,
    createStrategy({
      topic: 'Create logixUX Header Content',
      initialNode: stepLogixUXHead,
    }),
  ];
};
