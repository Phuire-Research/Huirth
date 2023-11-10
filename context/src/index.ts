/*$ Start template imports $*/
import { createAxium, createCounterConcept } from 'stratimux';
import { createHelloWorldConcept } from './concepts/helloWorld/helloWorld.concept';
import { createDocumentObjectModelConcept } from './concepts/documentObjectModel/documentObjectModel.concept';
import { createUserInterfaceClientConcept } from './concepts/userInterfaceClient/userInterfaceClient.concept';
/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  let init = false;
  let state: Record<string, unknown> | undefined;
  fetch(window.location.protocol + '//' + window.location.host + '/stateSync').then((response) => {
    response.json().then((value) => {
      state = value;
      console.log('WORKS', value);
      if (init && state) {
        createAxium(
          'contextAxium',
          [
            createHelloWorldConcept(),
            createDocumentObjectModelConcept({
              index: {
                '#buttonID': [
                  {
                    action: { type: 'Create logixUX triggerCountingStrategy', semaphore: [0, 0, -1, 0], expiration: 1699581422020 },
                    eventBinding: 'onclick',
                  },
                ],
              },
              error: {},
            }),
            createUserInterfaceClientConcept(state),
          ],
          true,
          true
        );
      }
    });
  });
  document.onreadystatechange = () => {
    if (!init) {
      init = true;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  console.log('AXIUM INIT');
  /*$ End context template code $*/
})();
