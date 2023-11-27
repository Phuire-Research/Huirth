/*<$
For the framework Stratimux and the User Interface Concept, generate a principle that will dispatch a sequence of page to state strategies that will cache the required pages for the client.
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
} from 'stratimux';
import { UserInterfaceState } from './userInterface.concept';
import { userInterfacePageToStateStrategy } from './strategies.ts/pageToState.strategy';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';

export const userInterfaceInitializationPrinciple: PrincipleFunction =
  (___: Subscriber<Action>, __: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const plan = concepts$.stage('User Interface Page to State initialization plan', [
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
      },
      (____, _____) => {
        plan.conclude();
      }]
    );
  };
/*#>*/