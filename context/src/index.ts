/*$ Start template imports $*/
import { createAxium } from 'stratimux';
import { createHelloWorldConcept } from './concepts/helloWorld/helloWorld.concept';
import { createDocumentObjectModelConcept } from './concepts/documentObjectModel/documentObjectModel.concept';
import { createUserInterfaceClientConcept } from './concepts/userInterfaceClient/userInterfaceClient.concept';
/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  const axium = createAxium('contextAxium', [
    createHelloWorldConcept(),
    createDocumentObjectModelConcept({
      index: {
        '#buttonID': [
          {
            action: { type: 'logged a message passed to Axium', semaphore: [0, 0, -1, 0], expiration: 1699488762798 },
            eventBinding: 'onclick',
          },
        ],
      },
      error: {},
    }),
    createUserInterfaceClientConcept(),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  console.log('AXIUM INIT');
  /*$ End context template code $*/
})();
