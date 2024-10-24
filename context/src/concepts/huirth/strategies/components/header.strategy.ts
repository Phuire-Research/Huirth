/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an Action Strategy Component Stitch that appends the huirth style component to the desired composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { huirthStyle } from '../../qualities/components/style.quality';
import { huirthHead } from '../../qualities/components/head.quality';
import { ActionStrategyComponentStitch, userInterface } from '../../../../model/userInterface';
import { HuirthDeck } from '../../huirth.concept';

export const huirthHeaderStitch: ActionStrategyComponentStitch<HuirthDeck> = (payload, deck) => {
  const stephuirthStyle = userInterface.createComponent(deck.huirth.e.huirthStyle(payload));
  const stephuirthHead = userInterface.createComponent(deck.huirth.e.huirthHead(payload), stephuirthStyle);
  return [
    stephuirthStyle,
    createStrategy({
      topic: 'Create huirth Header Content',
      initialNode: stephuirthHead,
    }),
  ];
};
/*#>*/
