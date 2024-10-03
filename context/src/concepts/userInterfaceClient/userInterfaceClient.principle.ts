/*<$
For the graph programming framework Stratimux and the User Interface Client Concept,
generate a principle that will detect changes on the client state based on the currently loaded page bound selectors, and dispatch the associated action if changed.
This will set up and bind the selectors to state to determine which atomic operation that should be dispatched to update the UI.
$>*/
/*<#*/
import { muxiumSelectOpen, getMuxiumState, selectSlice, strategyBegin } from 'stratimux';
import { UserInterfaceClientPrinciple } from './userInterfaceClient.concept';
import { UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload } from './qualities/clientAssembleAtomicUpdateCompositionStrategy.quality';
import { userInterfaceInitialBindingStrategy } from './strategies/initialBinding.strategy';
import { BoundSelectors, Page } from '../../model/userInterface';

export const userInterfaceClientOnChangePrinciple: UserInterfaceClientPrinciple = ({ plan, k_, conceptSemaphore }) => {
  // const atomicCachedState: Record<string, unknown> = {};
  const boundSelectorsSelector = k_.boundSelectors;
  const beat = 100;
  plan('User Interface Server on Change', ({ stage, k__, d__ }) => [
    stage(
      ({ concepts, dispatch, k, d, stagePlanner }) => {
        const name = k.name(concepts);
        if (name && selectSlice(concepts, muxiumSelectOpen) === true) {
          dispatch(d.muxium.e.muxiumRegisterStagePlanner({ conceptName: name, stagePlanner }), {
            iterateStage: true,
          });
        } else if (name === undefined) {
          stagePlanner.conclude();
        }
      },
      { selectors: [d__.muxium.k.open] }
    ),
    stage(
      ({ concepts, dispatch, k, stagePlanner }) => {
        //
        const pages = selectSlice<Page[]>(concepts, k.pages);
        if (pages) {
          if (pages.length > 0) {
            dispatch(strategyBegin(userInterfaceInitialBindingStrategy(getMuxiumState(concepts).action$, pages)), {
              iterateStage: true,
            });
          }
        } else {
          stagePlanner.conclude();
        }
      },
      { selectors: [k_.pages] }
    ),
    stage(
      ({ concepts, dispatch, changes, d, e, k, stagePlanner }) => {
        // console.log('Get unified name', getUnifiedName(concepts, semaphore));
        const uiState = k.state(concepts);
        if (uiState && uiState.pagesCached) {
          const newSelectors = [boundSelectorsSelector, ...uiState.selectors];
          const changed: Record<string, boolean> = {};
          const payload: UserInterfaceClientAssembleAtomicUpdateCompositionStrategyPayload = {
            action$: getMuxiumState(concepts).action$,
            boundActionQue: [],
          };
          changes?.forEach((change) => {
            const bound = uiState.boundSelectors[change.keys];
            if (bound) {
              bound.forEach((b: BoundSelectors) => {
                const exists = changed[b.semaphore.toString()];
                if (exists === undefined) {
                  changed[b.semaphore.toString()] = true;
                  b.action.conceptSemaphore = conceptSemaphore;
                  payload.boundActionQue.push(b);
                }
              });
            }
          });
          if (payload.boundActionQue.length > 0) {
            dispatch(e.userInterfaceClientAssembleAtomicUpdateCompositionStrategy(payload), {
              throttle: 0,
              newSelectors,
            });
          } else {
            dispatch(d.muxium.e.muxiumKick(), {
              throttle: 0,
              newSelectors,
            });
          }
        } else if (uiState === undefined) {
          console.log("SHOULDN'T CONCLUDE, unless removed");
          stagePlanner.conclude();
        }
      },
      { beat, selectors: [boundSelectorsSelector] }
    ),
  ]);
};
/*#>*/
