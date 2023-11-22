/*<$
For the framework Stratimux and a Concept logixUX, generate an Action Strategy Component Stitch that appends the logixUX style component to the desired composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { logixUXStyle } from '../../qualities/components/style.quality';
import { logixUXHead } from '../../qualities/components/head.quality';
import { ActionStrategyComponentStitch } from '../../../../model/userInterface';

export const logixUXHeaderStitch: ActionStrategyComponentStitch = (payload) => {
  const stepLogixUXStyle = createActionNode(logixUXStyle(payload), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXHead = createActionNode(logixUXHead(payload), {
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
/*#>*/
