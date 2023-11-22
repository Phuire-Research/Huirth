/*<$
For the framework Stratimux and a Concept logixUX, generate a test that will confirm that the generateNumID function is working as intended.
$>*/
/*<#*/
import { generateNumID, promptID, selectTrainingDataIndex } from '../logixUX.model';

test('userInterfaceBindingsToString', (done) => {
  const ID = promptID + generateNumID(0);
  const element = {} as HTMLElement;
  element.id = ID;
  expect(selectTrainingDataIndex(element, promptID)).toBe(0);
  done();
});
/*#>*/
