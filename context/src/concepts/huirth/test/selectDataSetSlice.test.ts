/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a test that will ensure that the selectSlice helper function from Stratimux is operating as intended.
$>*/
/*<#*/
import { Concepts, KeyedSelector, createConcept, createUnifiedKeyedSelector, selectSlice } from 'stratimux';
import { generateBaseDataSetEntry, generateDefaultNamedDataSet } from '../huirth.model';

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
/*#>*/
