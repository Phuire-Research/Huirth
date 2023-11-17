import { createActionNode, createStrategy } from 'stratimux';
import { ActionStrategyComponentStitch } from '../../../../model/userInterface';
import { logixUXSideBarEnd } from '../../qualities/components/sideBar/sideBarEnd.quality';
import { logixUXSideBarBegin } from '../../qualities/components/sideBar/sideBarBegin.quality';
import { logixUXSideBarContent } from '../../qualities/components/sideBar/sideBarContent.quality';

export const logixUXSidebarComponentStitch: ActionStrategyComponentStitch = (payload) => {
  // HEAD
  const stepLogixUXSidebarEnd = createActionNode(logixUXSideBarEnd(payload), {
    successNode: null,
    failureNode: null,
  });
  const stepLogixUXSidebarContent = createActionNode(logixUXSideBarContent(payload), {
    successNode: stepLogixUXSidebarEnd,
    failureNode: null,
  });
  const stepLogixUXSidebarBegin = createActionNode(logixUXSideBarBegin(payload), {
    successNode: stepLogixUXSidebarContent,
    failureNode: null,
  });
  return [
    stepLogixUXSidebarEnd,
    createStrategy({
      topic: 'Create logixUX Sidebar',
      initialNode: stepLogixUXSidebarBegin,
    }),
  ];
};
