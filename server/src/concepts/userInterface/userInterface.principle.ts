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
  axiumKick
} from 'stratimux';
import { UserInterfaceState } from './userInterface.concept';
import { userInterfacePageToStateStrategy } from './strategies.ts/pageToState.strategy';
import { getAxiumState, getUnifiedName } from '../../model/concepts';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';
import { userInterfaceDebouncePageCreationStrategy } from './strategies.ts/debouncePageCreation.strategy';

export const userInterfaceInitializationPrinciple: PrincipleFunction =
  (___: Subscriber<Action>, __: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    let pageLength = -1;
    const plan = concepts$.stage('User Interface Page to State', [
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
          pageLength = uiState.pageStrategies.length;
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
            const strategy = strategySequence([userInterfaceDebouncePageCreationStrategy(), ...list]);
            console.log('CHECK STRATEGY', strategy);
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
      (concepts, dispatch) => {
        const ui = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
        if (ui) {
          if (ui.pageStrategies.length !== pageLength) {
            dispatch(axiumKick(), {
              setStage: 1
            });
          }
        } else {
          plan.conclude();
        }
      }]
    );
  };

