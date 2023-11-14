import { Subject, map, withLatestFrom } from 'rxjs';
import { Action, Concepts, Method, UnifiedSubject, axiumConclude } from 'stratimux';

export const createMethodWithConcepts = (
  methodWithState: (action: Action, concepts: Concepts, semaphore: number) => Action,
  concepts$: UnifiedSubject,
  semaphore: number
): [Method, Subject<Action>] => {
  const defaultSubject = new Subject<Action>();
  const defaultMethod: Method = defaultSubject.pipe(
    withLatestFrom(concepts$ as UnifiedSubject),
    map(([act, concepts]: [Action, Concepts]) => {
      const methodAction = methodWithState(act, concepts, semaphore);
      if (methodAction.strategy) {
        return methodAction;
      }
      const conclude = axiumConclude();
      return {
        ...act,
        ...conclude,
      };
    })
  );
  defaultMethod.toString = () => 'Method with Concepts';
  return [defaultMethod, defaultSubject];
};
