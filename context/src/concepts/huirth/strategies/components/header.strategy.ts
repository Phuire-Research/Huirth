/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an Action Strategy Component Stitch that appends the huirth style component to the desired composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from '@phuire/stratimux';
import { huirthStyle } from '../../qualities/components/style.quality';
import { huirthHead } from '../../qualities/components/head.quality';
import { ActionStrategyComponentStitch, userInterface } from '../../../../model/userInterface';

export const huirthHeaderStitch: ActionStrategyComponentStitch = (payload) => {
  const stephuirthStyle = userInterface.createComponent(huirthStyle(payload));
  const stephuirthHead = userInterface.createComponent(huirthHead(payload), stephuirthStyle);
  return [
    stephuirthStyle,
    createStrategy({
      topic: 'Create huirth Header Content',
      initialNode: stephuirthHead,
    }),
  ];
};
/*#>*/
