/*<$
For the graph programming framework Stratimux and a Concept huirth, generate an Action Strategy Component Stitch that appends the Sidebar first, content, and last component slices to the desired composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch, userInterface } from '../../../../model/userInterface';
import { huirthSideBarEnd } from '../../qualities/components/sideBar/sideBarEnd.quality';
import { huirthSideBarBegin } from '../../qualities/components/sideBar/sideBarBegin.quality';
import { huirthSideBarContent } from '../../qualities/components/sideBar/sideBarContent.quality';

export const huirthSidebarComponentStitch: ActionStrategyComponentStitch = (payload) => {
  // HEAD
  const stephuirthSidebarEnd = userInterface.createComponent(huirthSideBarEnd(payload));
  const stephuirthSidebarContent = userInterface.createComponent(huirthSideBarContent(payload), stephuirthSidebarEnd);
  const stephuirthSidebarBegin = userInterface.createComponent(huirthSideBarBegin(payload), stephuirthSidebarContent);
  return [stephuirthSidebarEnd, createStrategy({
    topic: 'Create huirth Sidebar',
    initialNode: stephuirthSidebarBegin,
  })];
};
/*#>*/