/*<$
For the graph programming framework Stratimux and the huirth Project, generate a test to output the current project root.
$>*/
/*<#*/
import { findRoot } from '../model/findRoot';

test('FileSystem get Concept Directory Test', (done) => {
  console.log('Process CWD: ', process.cwd());
  console.log('Possible Root: ', findRoot());
  done();
});
/*#>*/