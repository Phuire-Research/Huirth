import { generateNumID, promptID, selectTrainingDataIndex } from '../logixUX.model';

test('userInterfaceBindingsToString', (done) => {
  const ID = promptID + generateNumID(0);
  const element = {} as HTMLElement;
  element.id = ID;
  expect(selectTrainingDataIndex(element, promptID)).toBe(0);
  done();
});
