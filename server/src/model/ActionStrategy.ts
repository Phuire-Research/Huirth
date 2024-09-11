/*<$
For the graph programming framework Stratimux, define a model file that defines a consumer function that returns a most optimum route from a strategy via its line of success.
$>*/
/*<#*/
import { ActionNode } from '@phuire/stratimux';

export const listNodeSuccess = (node: ActionNode): string[] => {
  const currentType = node.actionType;
  if (node.successNode !== null) {
    return [currentType, ...listNodeSuccess(node.successNode)];
  } else {
    return [currentType];
  }
};
/*#>*/
