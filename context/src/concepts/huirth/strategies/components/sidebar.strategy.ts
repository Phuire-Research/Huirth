/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an Action Strategy Component Stitch that appends the Sidebar first, content, and last component slices to the desired composition.
$>*/
/*<#*/
import { createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch, userInterface } from '../../../../model/userInterface';
import { HuirthDeck } from '../../huirth.concept';

export const huirthSidebarComponentStitch: ActionStrategyComponentStitch<HuirthDeck> = (payload, deck) => {
  // HEAD
  const stephuirthSidebarEnd = userInterface.createComponent(deck.huirth.e.huirthSideBarEnd(payload));
  const stephuirthSidebarContent = userInterface.createComponent(deck.huirth.e.huirthSideBarContent(payload), stephuirthSidebarEnd);
  const stephuirthSidebarBegin = userInterface.createComponent(deck.huirth.e.huirthSideBarBegin(payload), stephuirthSidebarContent);
  return [
    stephuirthSidebarEnd,
    createStrategy({
      topic: 'Create huirth Sidebar',
      initialNode: stephuirthSidebarBegin,
    }),
  ];
};
/*#>*/
