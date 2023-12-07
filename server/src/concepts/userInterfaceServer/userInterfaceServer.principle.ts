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
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  getUnifiedName,
  selectSlice,
  selectState,
  selectUnifiedState,
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
    const plan = concepts$.stage('State Sync Client Init', [
      (concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, __) => {
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
      }
    ]);

    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const initialFileSystemState = selectState<FileSystemState>(cpts, fileSystemName);
    const server = initialServerState.server;
    server.get('/', (__, res) => {
      let found = false;
      for (const page of pages) {
        if (page.title === 'index') {
          const c = components;
          res.send(page.compositions.map(comp => {
            if (comp.universal) {
              console.log('CHECK C', c[comp.componentSemaphore as number]);
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
    const atomicCachedState: Record<string, unknown> = {};
    const plan = concepts$.stage('User Interface Server on Change', [
      (concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            on: {
              expected: true,
              selector: axiumSelectOpen
            },
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const uiState = selectUnifiedState<UserInterfaceServerState>(concepts, semaphore);
        if (uiState && uiState.pagesCached) {
          // console.log('PAGES: ', uiState.pages.map(page => page.title).join(', '));
          const selectors: BoundSelectors[] = [];
          uiState.pages.forEach(page => {
            page.cachedSelectors.forEach(bound => {
              bound.action.conceptSemaphore = semaphore;
              selectors.push(bound);
            });
          });
          uiState.components.forEach(comp => {
            comp.boundSelectors.forEach(bound => {
              bound.action.conceptSemaphore = semaphore;
              selectors.push(bound);
            });
          });
          const payload: UserInterfaceServerAssembleUpdateAtomicCompositionStrategyPayload = {
            boundActionQue: []
          };
          const changes: string[] = [];
          const changedSelectors: KeyedSelector[] = [];
          selectors.forEach(bound => {
            for (const select of bound.selectors) {
              const value = selectSlice(concepts, select);
              let changed = false;
              if (typeof value !== 'object') {
                changed = (atomicCachedState as Record<string, unknown>)[select.stateKeys] !== value;
              } else {
                const object = (atomicCachedState as Record<string, unknown>)[select.stateKeys];
                if (object === undefined) {
                  changed = true;
                } else {
                  changed = !Object.is(object, value);
                }
              }
              if (changed) {
                if (!changes.includes(select.stateKeys)) {
                  changes.push(select.stateKeys);
                  changedSelectors.push(select);
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
          });
          for (let i = 0; i < changes.length; i++) {
            atomicCachedState[changes[i]] = selectSlice(concepts, changedSelectors[i]);
          }
          if (payload.boundActionQue.length > 0) {
            dispatch(userInterfaceServerAssembleUpdateAtomicCompositionStrategy(payload), {
              throttle: 1
            });
          }
        } else if (uiState === undefined) {
          plan.conclude();
        }
      },
    ], 333
    );
  };
/*#>*/