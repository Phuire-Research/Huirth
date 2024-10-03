/*<$
For the graph programming framework Stratimux and the huirth Project, generate a model that outputs the toString function for UserInterfacePageBindings.
$>*/
/*<#*/
import { UserInterfacePageBindings, userInterface_pageBindingsToString } from '../model/userInterface';
import { elementEventBinding } from '../model/html';
import { muxiumLog } from 'stratimux';

test('userInterfaceBindingsToString', (done) => {
  const testBindingToString: UserInterfacePageBindings = {
    somePage: {
      something: [
        {
          action: muxiumLog(),
          eventBinding: elementEventBinding.onclick,
        },
        {
          action: {
            type: 'someAction',
            expiration: Date.now() + 5000,
            semaphore: [-1, -1, -1, -1],
          },
          eventBinding: elementEventBinding.onabort,
        },
      ],
    },
  };
  console.log('TEST BINDING TO STRING', userInterface_pageBindingsToString(testBindingToString));
  done();
});
/*#>*/
