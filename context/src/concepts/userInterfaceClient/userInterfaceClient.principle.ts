// This will set up and bind the selectors to state to determine which atomic operation
// Should be dispatched to update the UI.

import {
  Action,
  Concepts,
  KeyedSelector,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  selectSlice,
  selectUnifiedState,
  updateUnifiedKeyedSelector,
} from 'stratimux';
import { UserInterfaceAssembleActionQueStrategyServerPayload } from '../userInterfaceServer/qualities/assembleActionQueStrategyServer.quality';
import { UserInterfaceClientState } from './userInterfaceClient.concept';
import { BoundSelectors, UserInterfaceBindings } from '../../model/userInterface';
import { Subscriber } from 'rxjs';
import { getAxiumState, getUnifiedName } from '../../model/concepts';
import {
  UserInterfaceClientAssembleActionQueStrategyPayload,
  userInterfaceClientAssembleActionQueStrategy,
} from './qualities/clientAssembleActionQueStrategy.quality';

export const userInterfaceServerOnChangePrinciple: PrincipleFunction = (
  ___: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  let cachedState = selectUnifiedState<UserInterfaceClientState>(cpts, semaphore);
  if (cachedState) {
    const plan = concepts$.stage('User Interface Server on Change', [
      (concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({ conceptName: name, stagePlanner: plan }), {
            on: {
              expected: true,
              selector: axiumSelectOpen,
            },
            iterateStage: true,
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const uiState = selectUnifiedState<UserInterfaceClientState>(concepts, semaphore);
        if (uiState && uiState.pagesCached) {
          const selectors: BoundSelectors[] = [];
          uiState.pages.forEach((page, i) => {
            if (page.title === uiState.currentPage) {
              page.cachedSelectors.forEach((bound) => {
                bound.action.conceptSemaphore = semaphore;
                selectors.push(bound);
              });
            }
          });
          const payload: UserInterfaceClientAssembleActionQueStrategyPayload = {
            action$: getAxiumState(concepts).action$,
            boundActionQue: [],
          };
          selectors.forEach((bound) => {
            for (const b of bound.selectors) {
              if (
                (cachedState as Record<string, unknown>)[b.stateKeys] !==
                selectSlice(concepts, updateUnifiedKeyedSelector(concepts, semaphore, b) as KeyedSelector)
              ) {
                payload.boundActionQue.push(bound);
              }
            }
          });
          cachedState = { ...uiState };
          if (payload.boundActionQue.length > 0) {
            dispatch(userInterfaceClientAssembleActionQueStrategy(payload), {
              throttle: 50,
            });
          }
        } else if (uiState === undefined) {
          plan.conclude();
        }
      },
    ]);
  }
};
