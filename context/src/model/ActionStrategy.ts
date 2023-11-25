import { ActionNode } from 'stratimux';

export const listNodeSuccess = (node: ActionNode): string[] => {
  const currentType = node.actionType;
  if (node.successNode !== null) {
    return [currentType, ...listNodeSuccess(node.successNode)];
  } else {
    return [currentType];
  }
};
