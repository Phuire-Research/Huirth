/*$ Start template imports $*/
import { createAxium } from 'stratimux';
import { createHelloWorldConcept } from './concepts/helloWorld/helloWorld.concept';
import { createDocumentObjectModelConcept } from './concepts/documentObjectModel/documentObjectModel.concept';
import { createUserInterfaceClientConcept } from './concepts/userInterfaceClient/userInterfaceClient.concept';
import { createLogixUXConcept } from './concepts/logixUX/logixUX.concept';

/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  let init = false;
  let state: Record<string, unknown> | undefined;
  fetch(window.location.protocol + '//' + window.location.host + '/stateSync').then((response) => {
    response.json().then((value) => {
      state = value;
      if (init && state) {
        createAxium(
          'contextAxium',
          [
            createHelloWorldConcept(),
            createDocumentObjectModelConcept({
              index: {
                '#strategyID': [
                  {
                    action: {
                      type: 'Create logixUX triggerCountingStrategy',
                      semaphore: [0, 0, -1, 0],
                      payload: { number: 0 },
                      expiration: 1699982541559,
                    },
                    eventBinding: 'onclick',
                  },
                ],
                '#strategyPlusID': [
                  {
                    action: {
                      type: 'Create logixUX triggerCountingStrategy',
                      semaphore: [0, 0, -1, 0],
                      payload: { number: 1 },
                      expiration: 1699982541559,
                    },
                    eventBinding: 'onclick',
                  },
                ],
                '#strategyMinusID': [
                  {
                    action: {
                      type: 'Create logixUX triggerCountingStrategy',
                      semaphore: [0, 0, -1, 0],
                      payload: { number: -1 },
                      expiration: 1699982541559,
                    },
                    eventBinding: 'onclick',
                  },
                ],
                '#addID': [
                  {
                    action: { type: 'Counter Add', semaphore: [0, 0, -1, 0], expiration: 1699982541559 },
                    eventBinding: 'onclick',
                  },
                ],
                '#subtractID': [
                  {
                    action: { type: 'Counter Subtract', semaphore: [0, 0, -1, 0], expiration: 1699982541559 },
                    eventBinding: 'onclick',
                  },
                ],
                '#promptID-000': [
                  {
                    action: { type: 'Create logixUX UpdateFromPromptPayload', semaphore: [0, 0, -1, 0], expiration: 1699982541667 },
                    eventBinding: 'onchange',
                  },
                ],
                '#chosenID-000': [
                  {
                    action: { type: 'Create logixUX UpdateFromChosenPayload', semaphore: [0, 0, -1, 0], expiration: 1699982541667 },
                    eventBinding: 'onchange',
                  },
                ],
                '#rejectedID-000': [
                  {
                    action: { type: 'Create logixUX UpdateFromRejectedPayload', semaphore: [0, 0, -1, 0], expiration: 1699982541667 },
                    eventBinding: 'onchange',
                  },
                ],
                '#addEntry': [
                  {
                    action: { type: 'Create logixUX NewDataSetEntry', semaphore: [0, 0, -1, 0], expiration: 1699982541667 },
                    eventBinding: 'onclick',
                  },
                ],
                '#saveTrainingData': [
                  {
                    action: { type: 'logixUX push saveTrainingData action to Server', semaphore: [0, 0, -1, 0], expiration: 1699982541667 },
                    eventBinding: 'onclick',
                  },
                ],
              },
              error: {},
            }),
            createUserInterfaceClientConcept(state, createLogixUXConcept),
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
