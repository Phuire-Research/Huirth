/*<$
For the graph programming framework Stratimux and the logixUX Project, generate a model that would contain the function that would determine the root of the logixUX Project.
$>*/
/*<#*/
import path from 'path';

export const findRoot = () => {
  const forwardSlash = process.cwd().split('/');
  const backSlash = process.cwd().split('\\');
  const possibleRoot = forwardSlash.length > backSlash.length ? forwardSlash : backSlash;
  const root = [];
  for (let i = 0; i < possibleRoot.length; i++) {
    if (possibleRoot[i] !== 'server' && possibleRoot[i] !== 'context') {
      console.log(possibleRoot[i]);
      root.push(possibleRoot[i]);
    } else {
      break;
    }
  }
  return path.join(root.join('/'));
};
/*#>*/