/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a test that will confirm that the generateNumID function is working as intended.
$>*/
/*<#*/
import { generateNumID, promptID, selectTrainingDataIndex } from '../huirth.model';

test('userInterfaceBindingsToString', (done) => {
  const ID = promptID + generateNumID(0);
  const element = {} as HTMLElement;
  element.id = ID;
  expect(selectTrainingDataIndex(element, promptID)).toBe(0);
  done();
});
/*#>*/