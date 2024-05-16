/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a principle that will dispatch a sequence of page to state strategies that will cache the required pages for the client.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import {
  Action,
  PrincipleFunction,
  UnifiedSubject,
  strategySequence,
  strategyBegin,
  selectUnifiedState,
  Concepts,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  ActionStrategy,
  getUnifiedName,
  getAxiumState,
  createStage,
  selectSlice,
  KeyedSelector,
  axiumKick,
} from 'stratimux';
import { UserInterfaceState } from './userInterface.concept';
import { userInterfacePageToStateStrategy } from './strategies.ts/pageToState.strategy';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';
import { userInterface_createPagesSelector } from './userInterface.selector';

export const userInterfaceInitializationPrinciple: PrincipleFunction = (
  ___: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const _diag = concepts$.subscribe((val) => {
    const axiumState = getAxiumState(val);
    if (axiumState.badActions.length > 0) {
      console.error('BAD ACTIONS: ', axiumState.badActions);
    }
    // console.log('BAD PLANS', axiumState.badPlans);
    // console.log('CHECK FOR SIDEBAR CONTENT', val[1].qualities[56]);
  });
  const plan = concepts$.plan('User Interface Page to State initialization plan', [
    createStage(
      (concepts, dispatch) => {
        console.log('USER INTERFACE PAGE TO STATE INIT 1');
        const name = getUnifiedName(concepts, semaphore);
        if (name && selectSlice(concepts, axiumSelectOpen) === true) {
          dispatch(axiumRegisterStagePlanner({ conceptName: name, stagePlanner: plan }), {
            iterateStage: true,
          });
        } else if (name === undefined) {
          console.log('THIS IS CONCLUDING EARLY', name, selectSlice(concepts, axiumSelectOpen));
          plan.conclude();
        }
      },
      { priority: 1000, selectors: [axiumSelectOpen] }
    ),
    createStage(
      (concepts, dispatch) => {
        const uiState = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
        console.log('USER INTERFACE PAGE TO STATE INIT 2', uiState?.pages.length, uiState?.pageStrategies.length);
        if (uiState) {
          if (uiState.pageStrategies.length === 1) {
            dispatch(strategyBegin(userInterfacePageToStateStrategy(uiState.pageStrategies[0](concepts))), {
              iterateStage: true,
            });
          } else if (uiState.pageStrategies.length > 1) {
            const isClient = userInterface_isClient();
            const list: ActionStrategy[] = [];
            uiState.pageStrategies.forEach((creator) => {
              if (isClient) {
                const pageCreator = creator(concepts);
                const title = pageCreator()[1].topic;
                const currentPage = (uiState as UserInterfaceClientState).currentPage;
                if (title === currentPage) {
                  list.push(userInterfacePageToStateStrategy(pageCreator));
                }
              } else {
                list.push(userInterfacePageToStateStrategy(creator(concepts)));
              }
            });
            const strategy = strategySequence(list);
            if (strategy) {
              console.log('DISPATCHED', uiState.pages.length, strategy);
              dispatch(strategyBegin(strategy), {
                iterateStage: true,
              });
            }
          } else {
            if (getAxiumState(concepts).logging) {
              console.log('No pages initialized');
            }
            plan.conclude();
          }
        }
      },
      { selectors: [userInterface_createPagesSelector(cpts, semaphore) as KeyedSelector] }
    ),
    createStage((____, _____) => {
      console.log('USER INTERFACE PAGE TO STATE INIT 3');
      plan.conclude();
    }),
  ]);
};
/*#>*/
