import { Concept, Concepts, KeyedSelector, createConcept, createUnifiedKeyedSelector, selectSlice } from 'stratimux';
import { generateBaseDataSetEntry, generateDefaultNamedDataSet, generateNumID, promptID, selectTrainingDataIndex } from '../logixUX.model';

test('userInterfaceBindingsToString', (done) => {
  const simulated = {
    trainingData: [generateDefaultNamedDataSet('something')],
  };
  const experiment = createConcept('experiment', simulated);
  const concepts: Concepts = {
    1: experiment,
  };
  const entry = generateBaseDataSetEntry();
  const selector = createUnifiedKeyedSelector(concepts, 1, 'trainingData 0 dataSet 0 prompt') as KeyedSelector;
  const getUndefined = { ...selector };
  getUndefined.conceptName = 'something';
  expect(selectSlice(concepts, selector)).toBe(entry.prompt);
  expect(selectSlice(concepts, getUndefined)).toBe(undefined);
  done();
});
