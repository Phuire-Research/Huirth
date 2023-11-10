// This will set up and bind the selectors to state to determine which atomic operation
// Should be dispatched to update the UI.

import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  selectSlice,
  selectUnifiedState,
} from 'stratimux';
import { UserInterfaceClientState } from './userInterfaceClient.concept';
import { BoundSelectors } from '../../model/userInterface';
import { Subscriber } from 'rxjs';
import { getAxiumState, getUnifiedName } from '../../model/concepts';
import {
  UserInterfaceClientAssembleActionQueStrategyPayload,
  userInterfaceClientAssembleActionQueStrategy
} from './qualities/clientAssembleActionQueStrategy.quality';

export const userInterfaceClientOnChangePrinciple: PrincipleFunction =
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
        console.log('HIT');
        const uiState = selectUnifiedState<UserInterfaceClientState>(concepts, semaphore);
        if (uiState && uiState.pagesCached) {
          const selectors: BoundSelectors[] = [];
          uiState.pages.forEach((page, i) => {
            if (page.title === uiState.currentPage) {
              page.cachedSelectors.forEach(bound => {
                bound.action.conceptSemaphore = semaphore;
                selectors.push(bound);
              });
            }
          });
          const payload: UserInterfaceClientAssembleActionQueStrategyPayload = {
            action$: getAxiumState(concepts).action$,
            boundActionQue: []
          };
          // Update so that the state that is being cached is set by the selectors. Finish this up tomorrow and move on
          selectors.forEach(bound => {
            for (const select of bound.selectors) {
              const value = selectSlice(concepts, select);
              // console.log('HITTING', select, value, atomicCachedState);
              if (
                (atomicCachedState as Record<string, unknown>)[select.stateKeys] !==
                value
              ) {
                payload.boundActionQue.push(bound);
              }
              atomicCachedState[select.stateKeys] = value;
            }
          });
          if (payload.boundActionQue.length > 0) {
            dispatch(userInterfaceClientAssembleActionQueStrategy(payload), {
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