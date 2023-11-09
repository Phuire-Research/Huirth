import {
  Action,
  ActionType,
  Method,
  MethodCreator,
  axiumConcludeType,
  createAction,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess,
} from 'stratimux';

import { Subject, map } from 'rxjs';
import { helloWorld } from '../../helloWorld/qualities/helloWorld.quality';
import { elementEventBinding } from '../../../model/html';
import { userInterface_appendCompositionToPage } from '../../../model/userInterface';

export const htmlHelloWorldType: ActionType = 'Html create hello world composition';
export const htmlHelloWorld = prepareActionCreator(htmlHelloWorldType);

const createHelloWorldMethodCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    map((action: Action) => {
      if (action.strategy) {
        const helloWorldId = '#helloWorld';
        return strategySuccess(
          action.strategy,
          userInterface_appendCompositionToPage(action.strategy, {
            selectors: [],
            bindings: {
              helloWorldId: [
                {
                  action: helloWorld(),
                  eventBinding: elementEventBinding.onclick,
                },
              ],
            },
            action: htmlHelloWorld(),
            html: /*html*/ `<h1 id=${helloWorldId}>Hello World</h1>`,
          })
        );
      }
      return createAction(axiumConcludeType);
    })
  );
  return [logMethod, logSubject];
};

export const htmlHelloWorldQuality = createQuality(htmlHelloWorldType, defaultReducer, createHelloWorldMethodCreator);
