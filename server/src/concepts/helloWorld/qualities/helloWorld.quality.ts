import {
  Action,
  ActionType,
  Method,
  MethodCreator,
  axiumConclude,
  createQuality,
  defaultReducer,
  prepareActionCreator,
  strategySuccess,
} from 'stratimux';
import { Subject, map } from 'rxjs';

export const helloWorldType: ActionType = 'Hello World';
export const helloWorld = prepareActionCreator(helloWorldType);

const createHelloWorldCreator: MethodCreator = () => {
  const logSubject = new Subject<Action>();
  const logMethod: Method = logSubject.pipe(
    map((action: Action) => {
      console.log('Hello World');
      if (action.strategy) {
        return strategySuccess(action.strategy);
      }
      return axiumConclude();
    })
  );
  return [
    logMethod,
    logSubject
  ];
};

export const helloWorldQuality = createQuality(
  helloWorldType,
  defaultReducer,
  createHelloWorldCreator,
);
