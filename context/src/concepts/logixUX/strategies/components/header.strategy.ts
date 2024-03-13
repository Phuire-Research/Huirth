/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate an Action Strategy Component Stitch that appends the logixUX style component to the desired composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { logixUXStyle } from '../../qualities/components/style.quality';
import { logixUXHead } from '../../qualities/components/head.quality';
import { ActionStrategyComponentStitch, userInterface } from '../../../../model/userInterface';

export const logixUXHeaderStitch: ActionStrategyComponentStitch = (payload) => {
  const stepLogixUXStyle = userInterface.createComponent(logixUXStyle(payload));
  const stepLogixUXHead = userInterface.createComponent(logixUXHead(payload), stepLogixUXStyle);
  return [
    stepLogixUXStyle,
    createStrategy({
      topic: 'Create logixUX Header Content',
      initialNode: stepLogixUXHead,
    }),
  ];
};
/*#>*/
