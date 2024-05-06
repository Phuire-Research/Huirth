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
} from 'stratimux';
import { UserInterfaceState } from './userInterface.concept';
import { userInterfacePageToStateStrategy } from './strategies.ts/pageToState.strategy';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';
import { userInterface_createPagesSelector } from './userInterface.selector';

export const userInterfaceInitializationPrinciple: PrincipleFunction =
  (___: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const _diag = concepts$.subscribe(val => {
      const axiumState = getAxiumState(val);
      if (axiumState.badActions.length > 0) {
        console.error('BAD ACTIONS: ', axiumState.badActions);
      }
    });
    const plan = concepts$.plan('User Interface Page to State initialization plan', [
      createStage((concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name && selectSlice(concepts, axiumSelectOpen)) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      }, { priority: 1000, selectors: [axiumSelectOpen]}),
      createStage((concepts, dispatch) => {
        const uiState = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
        if (uiState) {
          if (uiState.pageStrategies.length === 1) {
            dispatch(strategyBegin(userInterfacePageToStateStrategy(uiState.pageStrategies[0](concepts))), {
              iterateStage: true,
            });
          } else if (uiState.pageStrategies.length > 1) {
            const isClient = userInterface_isClient();
            const list: ActionStrategy[] = [];
            uiState.pageStrategies.forEach(creator => {
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
      }, {beat: 100, selectors: [userInterface_createPagesSelector(cpts, semaphore) as KeyedSelector]}),
      createStage((____, _____) => {
        plan.conclude();
      })
    ]);
  };
/*#>*/