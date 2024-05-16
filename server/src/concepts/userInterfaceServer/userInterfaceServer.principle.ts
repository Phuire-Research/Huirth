/*<$
For the graph programming framework Stratimux and the User Interface Server Concept, generate a principle that will create a plan that synchronizes the server's state with the client state.
While ignoring certain parts to allow for this recursive connection to be halting complete.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import { ServerState } from '../server/server.concept';
import express from 'express';
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
  getUnifiedName,
  refreshAction,
  select,
  selectSlice,
  selectState,
  selectUnifiedState,
  updateUnifiedKeyedSelector,
} from 'stratimux';
import { BoundSelectors, Composition, Page } from '../../model/userInterface';
import path from 'path';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import { findRoot } from '../../model/findRoot';
import { UserInterfaceServerState } from './userInterfaceServer.concept';
import {
  UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload,
  userInterfaceServerAssembleUpdateAtomicCompositionStrategy
} from './qualities/serverAssembleUpdateAtomicCompositionStrategy.quality';

export const userInterfaceServerPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const newState = selectUnifiedState(cpts, semaphore) as Record<string, unknown>;
    const body = 'body response';
    let pages: Page[] = [];
    let components: Composition[] = [];
    let errorPage: undefined | string;
    concepts$.subscribe(concepts => {
      const uiState = selectUnifiedState<UserInterfaceServerState>(concepts, semaphore);
      if (uiState) {
        console.log('CHECK PAGES LENGTH', uiState.pages.length);
        components = uiState.components;
        if (uiState.pages.length > 0) {
          // body = uiState.pages[0].compositions.map(comp => comp.html).join('');
          for (let i = 1; i < uiState.pages.length; i++) {
            const c = components;
            if (uiState.pages[i].title === 'error') {
              errorPage = uiState.pages[i].compositions.map(comp => {
                if (comp.universal) {
                  return c[comp.componentSemaphore as number].html;
                }
                return comp.html;
              }).join('');
              break;
            }
            // else if (page.title === 'index') {
            //   body = page.compositions.flatMap(comp => comp.cachedHtml)[0];
            // }
          }
          pages = uiState.pages;
        }
      }
    });
    const plan = concepts$.plan('State Sync Client Init', [
      createStage((concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      }),
      createStage((concepts, __) => {
        const state = selectUnifiedState<Record<string, unknown>>(concepts, semaphore);
        if (state) {
          const stateKeys = Object.keys(state);
          for (const key of stateKeys) {
            if (key !== 'pages' && key !== 'pageStrategies' && key !== 'pagesCached' && key !== 'currentPage' && key !== 'actionQue') {
              newState[key] = state[key];
            }
          }
        } else {
          plan.conclude();
        }
      })
    ]);

    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const initialFileSystemState = selectState<FileSystemState>(cpts, fileSystemName);
    const server = initialServerState.server;
    server.get('/', (__, res) => {
      res.set({
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      });
      let found = false;
      for (const page of pages) {
        if (page.title === 'index') {
          const c = components;
          res.send(page.compositions.map(comp => {
            if (comp.universal) {
              return c[comp.componentSemaphore as number].html;
            }
            return comp.html;
          }).join(''));
          found = true;
          break;
        }
      }
      if (!found && errorPage !== undefined) {
        res.send(errorPage);
      } else if (!found) {
        res.send(body);
      }
    });
    server.get('/stateSync', (__, res) => {
      res.json(newState);
    });
    server.get('/:title', (req, res) => {
      res.set({
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      });
      let found = false;
      for (const page of pages) {
        if (page.title === req.params.title) {
          const c = components;
          res.send(page.compositions.map(comp => {
            if (comp.universal) {
              return c[comp.componentSemaphore as number].html;
            }
            return comp.html;
          }).join(''));
          found = true;
          break;
        }
      }
      // console.log('Check', found, errorPage);
      if (!found && errorPage !== undefined) {
        res.send(errorPage);
      } else if (!found) {
        res.send('404');
      }
    });

    let root;
    if (initialFileSystemState) {
      root = initialFileSystemState.root;
    } else {
      root = findRoot();
    }
    const contextPublic = path.join(root + '/context/public');
    server.use('/static', (req, res, next) => {
      express.static(contextPublic)(req, res, next);
    });
  };

export const userInterfaceServerOnChangePrinciple: PrincipleFunction =
  (___: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const plan = concepts$.plan('User Interface Server on Change', [
      createStage((concepts, dispatch) => {
        console.log('INIT USER INTERFACE SERVER ON CHANGE');
        const name = getUnifiedName(concepts, semaphore);
        if (name && selectSlice(concepts, axiumSelectOpen) === true) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            iterateStage: true
          });
        } else if (name === undefined) {
          plan.conclude();
        }
      }, {selectors: [axiumSelectOpen]}),
      // createStage((concepts, dispatch) => {
      //   const uiState = selectUnifiedState<UserInterfaceServerState>(concepts, semaphore);
      //   if (uiState && uiState.pagesCached) {
      //     // console.log('PAGES: ', uiState.pages.map(page => page.title).join(', '));
      //     const selectors: BoundSelectors[] = [];
      //     uiState.pages.forEach(page => {
      //       page.cachedSelectors.forEach(bound => {
      //         bound.action.conceptSemaphore = semaphore;
      //         selectors.push(bound);
      //       });
      //     });
      //     uiState.components.forEach(comp => {
      //       comp.boundSelectors.forEach(bound => {
      //         bound.action.conceptSemaphore = semaphore;
      //         selectors.push(bound);
      //       });
      //     });
      //     const payload: UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload = {
      //       boundActionQue: []
      //     };
      //     const changes: string[] = [];
      //     const changedSelectors: KeyedSelector[] = [];
      //     selectors.forEach(bound => {
      //       for (const ks of bound.selectors) {
      //         const s = updateUnifiedKeyedSelector(concepts, semaphore, ks) as KeyedSelector;
      //         const value = select.slice(concepts, s);
      //         let changed = false;
      //         if (typeof value !== 'object') {
      //           changed = (atomicCachedState as Record<string, unknown>)[s.keys] !== value;
      //         } else {
      //           const object = (atomicCachedState as Record<string, unknown>)[s.keys];
      //           if (object === undefined) {
      //             changed = true;
      //           } else {
      //             changed = !Object.is(object, value);
      //           }
      //         }
      //         if (changed) {
      //           if (!changes.includes(s.keys)) {
      //             changes.push(s.keys);
      //             changedSelectors.push(s);
      //           }
      //           let exists = false;
      //           for (const b of payload.boundActionQue) {
      //             if (b.id === bound.id) {
      //               exists = true;
      //               break;
      //             }
      //           }
      //           if (!exists) {
      //             payload.boundActionQue.push(bound);
      //           }
      //         }
      //       }
      //     });
      //     for (let i = 0; i < changes.length; i++) {
      //       atomicCachedState[changes[i]] = selectSlice(concepts, changedSelectors[i]);
      //     }
      //     if (payload.boundActionQue.length > 0) {
      //       dispatch(userInterfaceServerAssembleUpdateAtomicCompositionStrategy(payload), {
      //         throttle: 1
      //       });
      //     }
      //   } else if (uiState === undefined) {
      //     plan.conclude();
      //   }
      // }, {beat: 333}),

      createStage((concepts, dispatch, changes) => {
        // console.log('Get unified name', getUnifiedName(concepts, semaphore));
        const uiState = selectUnifiedState<UserInterfaceServerState>(concepts, semaphore);
        if (uiState && uiState.pagesCached) {
          const newSelectors = uiState.selectors.map(keyed => updateUnifiedKeyedSelector(concepts, semaphore, keyed) as KeyedSelector);
          const changed: Record<string, boolean> = {};
          const payload: UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload = {
            boundActionQue: []
          };
          console.log('CHANGES: ', changes);
          changes?.forEach(change => {
            // const chunk = change.keys.split('Server');
            // const client = chunk[0] + 'Client' + chunk[1];
            const bound = uiState.boundSelectors[change.keys];
            // console.log('HIT', bound, uiState.boundSelectors, chunk, client);
            if (bound) {
              console.log('CHECK BOUND', bound);
              bound.forEach(b => {
                const exists = changed[b.semaphore.toString()];
                if (exists === undefined) {
                  changed[b.semaphore.toString()] = true;
                  b.action.conceptSemaphore = semaphore;
                  payload.boundActionQue.push(b);
                }
              });
            }
          });
          // console.log('CHECK CHANGES', changes);
          // console.log('CHECK UI STATE SELECTORS', uiState.selectors);
          // console.log('CHECK NEW SELECTORS', newSelectors);
          console.log('CHECK BOUND SELECTORS', Object.keys(uiState.boundSelectors).map(key => {
            return uiState.boundSelectors[key].map(b => b).map(some => `${key} ${some.semaphore}`);
          }));
          console.log('CHECK PAYLOAD', payload);
          // console.log('CHECK COMPONENTS', uiState.components);
          if (payload.boundActionQue.length > 0) {
            console.log('ATOMIC UPDATE', payload.boundActionQue.map(bound => bound.semaphore));
            dispatch(userInterfaceServerAssembleUpdateAtomicCompositionStrategy(payload), {
              throttle: 0,
              newSelectors
            });
          } else {
            dispatch(axiumKick(), {
              throttle: 0,
              newSelectors
            });
          }
        } else if (uiState === undefined) {
          console.log('SHOULDN\'T CONCLUDE, unless removed');
          plan.conclude();
        }
      }, {beat: 33}),
    ]
    );
  };
/*#>*/