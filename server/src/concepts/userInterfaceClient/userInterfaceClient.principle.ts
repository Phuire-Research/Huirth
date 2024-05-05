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
  strategyBegin,
  updateUnifiedKeyedSelector,
} from 'stratimux';
import { UserInterfaceClientState } from './userInterfaceClient.concept';
import { BoundSelectors } from '../../model/userInterface';
import { Subscriber } from 'rxjs';
import {
  UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload,
  userInterfaceClientAssembleAtomicUpdateCompositionStrategy
} from './qualities/clientAssembleAtomicUpdateCompositionStrategy.quality';
import { userInterface_createBoundSelectorsSelector, userInterface_createPagesSelector } from '../userInterface/userInterface.selector';
import { huirth_createDialogSelector } from '../huirth/huirth.selector';
import { userInterfaceInitialBindingStrategy } from './qualities/initialBinding.strategy';

export const userInterfaceClientOnChangePrinciple: PrincipleFunction =
  (___: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    // const atomicCachedState: Record<string, unknown> = {};
    const boundSelectorsSelector = userInterface_createBoundSelectorsSelector(cpts, semaphore) as KeyedSelector;
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
        //
        const pages = selectUnifiedState<UserInterfaceClientState>(concepts, semaphore)?.pages;
        if (pages) {
          if (pages.length > 0) {
            dispatch(strategyBegin(userInterfaceInitialBindingStrategy(getAxiumState(concepts).action$, pages)), {
              iterateStage: true,
            });
          }
        } else {
          plan.conclude();
        }
      }, { selectors: [userInterface_createPagesSelector(cpts, semaphore) as KeyedSelector] }),
      createStage((concepts, dispatch, changes) => {
        // console.log('Get unified name', getUnifiedName(concepts, semaphore));
        const uiState = selectUnifiedState<UserInterfaceClientState>(concepts, semaphore);
        if (uiState && uiState.pagesCached) {
          const newSelectors = [boundSelectorsSelector, huirth_createDialogSelector(concepts, semaphore) as KeyedSelector, ...uiState.selectors];
          const changed: Record<string, boolean> = {};
          const payload: UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload = {
            action$: getAxiumState(concepts).action$,
            boundActionQue: [],
          };
          changes?.forEach(change => {
            const bound = uiState.boundSelectors[change.keys];
            if (bound) {
              bound.forEach(b => {
                b.action.conceptSemaphore = semaphore;
                if (changed[b.action.type] === undefined) {
                  payload.boundActionQue.push(b);
                } else {
                  changed[b.action.type] = true;
                }
              });
            }
          });
          if (payload.boundActionQue.length > 0) {
            dispatch(userInterfaceClientAssembleAtomicUpdateCompositionStrategy(payload), {
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
      }, {beat, selectors: [boundSelectorsSelector]}),
    ]
    );
  };
/*#>*/