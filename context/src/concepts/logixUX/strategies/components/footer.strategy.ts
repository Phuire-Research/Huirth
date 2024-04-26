/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate an Action Strategy Component Stitch that appends the logixUX footer to the desired composition.
$>*/
/*<#*/
import { axium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { logixUXFooter } from '../../qualities/components/footer.quality';
import { ActionStrategyComponentStitch } from '../../../../model/userInterface';

export const logixUXFooterStitch: ActionStrategyComponentStitch = (payload) => {
  const stepStitch = axium_createStitchNode();
  const stepLogixUXFooter = createActionNode(logixUXFooter(payload), {
    successNode: stepStitch,
  });
  return [
    stepStitch,
    createStrategy({
      topic: 'Create logixUX Header Content',
      initialNode: stepLogixUXFooter,
    }),
  ];
};
/*#>*/
