/*$ Start template imports $*/
import { createAxium } from 'stratimux';
import { createDocumentObjectModelConcept } from './concepts/documentObjectModel/documentObjectModel.concept';
import { createUserInterfaceClientConcept } from './concepts/userInterfaceClient/userInterfaceClient.concept';
import { createHuirthConcept } from './concepts/huirth/huirth.concept';

/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  let init = false;
  let state: Record<string, unknown> | undefined;
  fetch(window.location.protocol + '//' + window.location.host + '/stateSync').then((response) => {
    response.json().then((value) => {
      state = value;
      // console.log('FETCH SYNC STATE', state);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const simmer = (func: (s?: any) => void) => {
        setTimeout(() => {
          if (init && state) {
            createAxium(
              'contextAxium',
              [createDocumentObjectModelConcept({}), createUserInterfaceClientConcept(state, createHuirthConcept)],
              true,
              true
            );
          } else {
            func();
          }
        }, 100);
      };
      simmer(simmer);
    });
  });
  document.onreadystatechange = () => {
    if (!init) {
      init = true;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.onunload = function () {};
  console.log('AXIUM INIT');
  /*$ End context template code $*/
})();
