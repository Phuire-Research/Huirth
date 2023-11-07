import { Subscriber } from 'rxjs';
import {
  Action,
  AxiumState,
  PrincipleFunction,
  UnifiedSubject,
  strategySequence,
  strategyBegin,
  selectUnifiedState,
  Concepts
} from 'stratimux';
import { UserInterfaceState, userInterfaceName } from './userInterface.concept';
import { userInterfacePageToStateStrategy } from './strategies.ts/pageToState.strategy';

export const userInterfaceInitializationPrinciple: PrincipleFunction =
async (observer: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
  const sub = concepts$.subscribe((c) => {
    const axiumState = c[0].state as AxiumState;
    if (axiumState.open) {
      sub.unsubscribe();
      const stage = concepts$.stage('User Interface Page to State', [
        (concepts, dispatch) => {
          const uiState = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
          if (uiState) {
            if (uiState.pageStrategies.length === 1) {
              dispatch(strategyBegin(userInterfacePageToStateStrategy(uiState.pageStrategies[0](concepts))), {
                iterateStage: true,
              });
            } else if (uiState.pageStrategies.length > 1) {
              const list = uiState.pageStrategies.map(creator => userInterfacePageToStateStrategy(creator(concepts)));
              const strategy = strategySequence(list);
              if (strategy) {
                dispatch(strategyBegin(strategy), {
                  iterateStage: true,
                });
              }
            } else {
              console.log('No pages initialized');
              stage.conclude();
            }
          }
        },
        (concepts, _) => {
          const ui = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
          if (ui) {
            if (ui.pages.length > 0) {
              console.log('Success');
            }
          }
          stage.conclude();
        }]
      );
    }
  });
};
