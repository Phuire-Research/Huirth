/*<$
For the graph programming framework Stratimux and the User Interface Client Concept,
generate a principle that will detect changes on the client state based on the currently loaded page bound selectors, and dispatch the associated action if changed.
This will set up and bind the selectors to state to determine which atomic operation that should be dispatched to update the UI.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  KeyedSelector,
  PrincipleFunction,
  UnifiedSubject,
  axiumKick,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  createStage,
  getAxiumState,
  getUnifiedName,
  selectSlice,
  selectUnifiedState,
  updateUnifiedKeyedSelector,
} from 'stratimux';
import { UserInterfaceClientState } from './userInterfaceClient.concept';
import { BoundSelectors } from '../../model/userInterface';
import { Subscriber } from 'rxjs';
import {
  UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload,
  userInterfaceClientAssembleAtomicUpdateCompositionStrategy
} from './qualities/clientAssembleAtomicUpdateCompositionStrategy.quality';

export const userInterfaceClientOnChangePrinciple: PrincipleFunction =
  (___: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const atomicCachedState: Record<string, unknown> = {};
    let delayChanges = false;
    const beat = 100;
    const plan = concepts$.plan('User Interface Server on Change', [
      createStage((concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name && selectSlice(concepts, axiumSelectOpen)) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      }, {selectors: [axiumSelectOpen]}),
      createStage((concepts, dispatch) => {
        console.log('Get unified name', getUnifiedName(concepts, semaphore));
        const uiState = selectUnifiedState<UserInterfaceClientState>(concepts, semaphore);
        if (uiState && uiState.pagesCached) {
          const selectors: BoundSelectors[] = [];
          uiState.pages.forEach((page, i) => {
            if (page.title === uiState.currentPage) {
              page.cachedSelectors.forEach(bound => {
                bound.action.conceptSemaphore = semaphore;
                selectors.push(bound);
              });
              page.cachedComponentSelectors.forEach(bound => {
                bound.action.conceptSemaphore = semaphore;
                selectors.push(bound);
              });
            }
          });
          const payload: UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload = {
            action$: getAxiumState(concepts).action$,
            boundActionQue: [],
          };
          const changes: string[] = [];
          const changedSelectors: KeyedSelector[] = [];
          selectors.forEach(bound => {
            for (const s of bound.selectors) {
              // It is interesting to note, that if we attempt to use the updateUnifiedKeyedSelector here.
              // The time complexity ruins this stage from operating at all.
              const updated = updateUnifiedKeyedSelector(concepts, semaphore, s);
              if (updated) {
                const value = selectSlice(concepts, updated);
                let changed = false;
                if (typeof value !== 'object') {
                  changed = (atomicCachedState as Record<string, unknown>)[updated.keys] !== value;
                } else {
                  const object = (atomicCachedState as Record<string, unknown>)[updated.keys];
                  if (object === undefined) {
                    changed = true;
                  } else {
                    changed = !Object.is(object, value);
                  }
                }
                if (changed) {
                  if (!changes.includes(updated.keys)) {
                    changes.push(updated.keys);
                    changedSelectors.push(updated);
                  }
                  let exists = false;
                  for (const b of payload.boundActionQue) {
                    if (b.id === bound.id) {
                      exists = true;
                      break;
                    }
                  }
                  if (!exists) {
                    payload.boundActionQue.push(bound);
                  }
                }
              }
            }
          });
          for (let i = 0; i < changes.length; i++) {
            atomicCachedState[changes[i]] = selectSlice(concepts, changedSelectors[i]);
          }
          if (payload.boundActionQue.length > 0) {
            setTimeout(() => {
              delayChanges = false;
            }, 100);
            delayChanges = true;
            dispatch(userInterfaceClientAssembleAtomicUpdateCompositionStrategy(payload), {
              iterateStage: true,
              throttle: 1
            });
          }
        } else if (uiState === undefined) {
          console.log('SHOULDN\'T CONCLUDE, unless removed');
          plan.conclude();
        }
      }, {beat}),
      createStage((_, dispatch) => {
        if (!delayChanges) {
          dispatch(axiumKick(), {
            setStage: 1,
            throttle: 1
          });
        }
      })
    ]
    );
  };
/*#>*/