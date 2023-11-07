/*$ Start template imports $*/
import { createAxium } from 'stratimux';
import { createHelloWorldConcept } from './concepts/helloWorld/helloWorld.concept';
import { createDocumentObjectModelConcept } from './concepts/documentObjectModel/documentObjectModel.concept';
/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  const axium = createAxium('contextAxium', [createHelloWorldConcept(), createDocumentObjectModelConcept({ index: {}, error: {} })]);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  console.log('AXIUM INIT');
  /*$ End context template code $*/
})();
