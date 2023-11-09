/*$ Start template imports $*/
import { createAxium, createCounterConcept } from 'stratimux';
import { createHelloWorldConcept } from './concepts/helloWorld/helloWorld.concept';
import { createDocumentObjectModelConcept } from './concepts/documentObjectModel/documentObjectModel.concept';
import { createUserInterfaceClientConcept } from './concepts/userInterfaceClient/userInterfaceClient.concept';
/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  let init = false;
  document.onreadystatechange = () => {
    if (!init) {
      init = true;
      createAxium(
        'contextAxium',
        [
          createHelloWorldConcept(),
          createCounterConcept(),
          createDocumentObjectModelConcept({
            index: {
              '#buttonID': [
                {
                  action: { type: 'Create logixUX triggerCountingStrategy', semaphore: [0, 0, -1, 0], expiration: 1699565095957 },
                  eventBinding: 'onclick',
                },
              ],
            },
          }),
          createUserInterfaceClientConcept(),
        ],
        true
      );
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  console.log('AXIUM INIT');
  /*$ End context template code $*/
})();
