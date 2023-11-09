import { Subscriber } from 'rxjs';
import {
  Action,
  AxiumState,
  PrincipleFunction,
  UnifiedSubject,
  strategySequence,
  strategyBegin,
  selectUnifiedState,
  Concepts,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
} from 'stratimux';
import { UserInterfaceState } from './userInterface.concept';
import { userInterfacePageToStateStrategy } from './strategies.ts/pageToState.strategy';
import { getAxiumState, getUnifiedName } from '../../model/concepts';

export const userInterfaceInitializationPrinciple: PrincipleFunction = (
  ___: Subscriber<Action>,
  __: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const plan = concepts$.stage('User Interface Page to State', [
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
      const uiState = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
      if (uiState) {
        if (uiState.pageStrategies.length === 1) {
          dispatch(strategyBegin(userInterfacePageToStateStrategy(uiState.pageStrategies[0](concepts))), {
            iterateStage: true,
          });
        } else if (uiState.pageStrategies.length > 1) {
          const list = uiState.pageStrategies.map((creator) => userInterfacePageToStateStrategy(creator(concepts)));
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
    (concepts, _) => {
      if (getAxiumState(concepts).logging) {
        const ui = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
        if (ui) {
          if (ui.pages.length > 0) {
            console.log('Pages Populated: ', ui.pages.length);
          }
        }
      }
      plan.conclude();
    },
  ]);
};