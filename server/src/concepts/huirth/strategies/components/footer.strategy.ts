/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an Action Strategy Component Stitch that appends the huirth footer to the desired composition.
$>*/
/*<#*/
import { muxium_createStitchNode, createActionNode, createStrategy } from 'stratimux';
import { huirthFooter } from '../../qualities/components/footer.quality';
import { ActionStrategyComponentStitch } from '../../../../model/userInterface';

export const huirthFooterStitch: ActionStrategyComponentStitch = (payload) => {
  const stepStitch = muxium_createStitchNode();
  const stephuirthFooter = createActionNode(huirthFooter.actionCreator(payload), {
    successNode: stepStitch,
  });
  return [
    stepStitch,
    createStrategy({
      topic: 'Create huirth Header Content',
      initialNode: stephuirthFooter,
    }),
  ];
};
/*#>*/
