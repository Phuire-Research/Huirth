import { Subscriber } from 'rxjs';
import { ServerState } from '../server/server.concept';
import express from 'express';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  selectSlice,
  selectState,
  selectUnifiedState,
} from 'stratimux';
import { BoundSelectors, Page } from '../../model/userInterface';
import path from 'path';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import { findRoot } from '../../model/findRoot';
import { UserInterfaceServerState } from './userInterfaceServer.concept';
import { getUnifiedName } from '../../model/concepts';
import {
  UserInterfaceServerAssembleActionQueStrategyPayload,
  userInterfaceServerAssembleActionQueStrategy
} from './qualities/serverAssembleActionQueStrategy.quality';

export const userInterfaceServerPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const body = 'body response';
    let pages: Page[] = [];
    let errorPage: undefined | string;
    concepts$.subscribe(concepts => {
      const uiState = selectUnifiedState<UserInterfaceServerState>(concepts, semaphore);
      if (uiState) {
        if (uiState.pages.length > 0) {
          // body = uiState.pages[0].compositions.map(comp => comp.html).join('');
          for (let i = 1; i < uiState.pages.length; i++) {
            if (uiState.pages[i].title === 'error') {
              errorPage = uiState.pages[i].compositions.map(comp => comp.html).join('');
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
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const initialFileSystemState = selectState<FileSystemState>(cpts, fileSystemName);
    const server = initialServerState.server;
    server.get('/', (__, res) => {
      let found = false;
      for (const page of pages) {
        if (page.title === 'index') {
          res.send(page.compositions.map(comp => comp.html).join(''));
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
    server.get('/:title', (req, res) => {
      let found = false;
      for (const page of pages) {
        if (page.title === req.params.title) {
          res.send(page.compositions.map(comp => comp.html).join(''));
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
          const selectors: BoundSelectors[] = [];
          uiState.pages.forEach(page => page.cachedSelectors.forEach(bound => {
            bound.action.conceptSemaphore = semaphore;
            selectors.push(bound);
          }));
          const payload: UserInterfaceServerAssembleActionQueStrategyPayload = {
            boundActionQue: []
          };
          selectors.forEach(bound => {
            for (const select of bound.selectors) {
              const value = selectSlice(concepts, select);
              if (
                atomicCachedState[select.stateKeys] !==
                value
              ) {
                payload.boundActionQue.push(bound);
              }
              atomicCachedState[select.stateKeys] = value;
            }
          });
          if (payload.boundActionQue.length > 0) {
            dispatch(userInterfaceServerAssembleActionQueStrategy(payload), {
              throttle: 50
            });
          }
        } else if (uiState === undefined) {
          plan.conclude();
        }
      },
    ]
    );
  };