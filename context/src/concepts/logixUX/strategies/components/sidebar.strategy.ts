/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate an Action Strategy Component Stitch that appends the Sidebar first, content, and last component slices to the desired composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch, userInterface } from '../../../../model/userInterface';
import { logixUXSideBarEnd } from '../../qualities/components/sideBar/sideBarEnd.quality';
import { logixUXSideBarBegin } from '../../qualities/components/sideBar/sideBarBegin.quality';
import { logixUXSideBarContent } from '../../qualities/components/sideBar/sideBarContent.quality';

export const logixUXSidebarComponentStitch: ActionStrategyComponentStitch = (payload) => {
  // HEAD
  const stepLogixUXSidebarEnd = userInterface.createComponent(logixUXSideBarEnd(payload));
  const stepLogixUXSidebarContent = userInterface.createComponent(logixUXSideBarContent(payload), stepLogixUXSidebarEnd);
  const stepLogixUXSidebarBegin = userInterface.createComponent(logixUXSideBarBegin(payload), stepLogixUXSidebarContent);
  return [
    stepLogixUXSidebarEnd,
    createStrategy({
      topic: 'Create logixUX Sidebar',
      initialNode: stepLogixUXSidebarBegin,
    }),
  ];
};
/*#>*/
