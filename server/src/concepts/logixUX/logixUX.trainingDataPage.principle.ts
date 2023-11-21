import { Subscriber } from 'rxjs';
import { Action, ActionStrategy, Concepts, PrincipleFunction, UnifiedSubject, axiumRegisterStagePlanner, getUnifiedName, selectUnifiedState, strategyBegin, strategySequence } from 'stratimux';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceState } from '../userInterface/userInterface.concept';
import { LogixUXState } from './logixUX.concept';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';
import { userInterfaceAddNewPageStrategy } from '../userInterface/strategies.ts/addNewPage.strategy';
import { logixUXGeneratedTrainingDataPageStrategy } from './strategies/pages/generatedTrainingDataPage.strategy';

export const logixUXTrainingDataPagePrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    let cachedTrainingDataNames: string[] = [];
    const isClient = userInterface_isClient();
    const plan = concepts$.stage('Observe Training Data and modify Pages', [
      (concepts, dispatch) => {
        const state = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
        const conceptName = getUnifiedName(concepts, semaphore);
        if (conceptName) {
          if (state && (state.pageStrategies.length === state.pages.length || isClient)) {
            dispatch(axiumRegisterStagePlanner({conceptName, stagePlanner: plan}), {
              iterateStage: true,
            });
          }
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const state = selectUnifiedState<LogixUXState & UserInterfaceState>(concepts, semaphore);
        const trainingData = state?.trainingData;
        if (state && trainingData && trainingData.length > 0) {
          const add: {
            i: number,
            name: string
          }[] = [];
          const trainingDataNames = trainingData.map((data, i) => {
            add.push({
              i,
              name: data.name
            });
            return data.name;
          });
          cachedTrainingDataNames = trainingDataNames;
          if (add.length > 0) {
            const list: ActionStrategy[] = [];
            if (isClient) {
              const currentPage = (selectUnifiedState(concepts, semaphore) as UserInterfaceClientState).currentPage;
              for (let i = 0; i < add.length; i++) {
                // eslint-disable-next-line max-depth
                if (currentPage === add[i].name) {
                  list.push(userInterfaceAddNewPageStrategy(
                    logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name)
                  ));
                }
              }
              const strategies = strategySequence(list);
              if (strategies) {
                dispatch(strategyBegin(strategies), {
                  throttle: 60
                });
                // eslint-disable-next-line max-depth
                plan.conclude();
              }
            } else {
              for (let i = 0; i < add.length; i++) {
                list.push(userInterfaceAddNewPageStrategy(
                  logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name)
                ));
              }
              const strategies = strategySequence(list);
              if (strategies) {
                dispatch(strategyBegin(strategies), {
                  iterateStage: true
                });
              }
            }
          }
        }
        if (state === undefined) {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const state = selectUnifiedState<LogixUXState & UserInterfaceState>(concepts, semaphore);
        const trainingData = state?.trainingData;
        if (state && trainingData) {
          console.log('CHECK PAGE NAMES', state.pages.map(page => page.title));
          const add: {
            i: number,
            name: string
          }[] = [];
          const remove: {
            i: number,
            name: string
          }[] = [];
          const trainingDataNames = trainingData.map((data, i) => {
            let found = false;
            let removed = false;
            let first = false;
            if (cachedTrainingDataNames.length === 0) {
              first = true;
              add.push({
                i,
                name: data.name
              });
            }
            for (const [index, name] of cachedTrainingDataNames.entries()) {
              if (data.name === name) {
                found = true;
                break;
              }
              if (
                data.name !== name &&
                trainingData.length < cachedTrainingDataNames.length &&
                i === cachedTrainingDataNames.length - 1 &&
                !found
              ) {
                removed = true;
                remove.push({
                  i: index,
                  name,
                });
              }
            }
            if (!first && !found && !removed) {
              add.push({
                i,
                name: data.name
              });
            }
            return data.name;
          });
          cachedTrainingDataNames = trainingDataNames;
          console.log('CHECK ADD REMOVE QUE', add, remove);
          if (add.length > 0 || remove.length > 0) {
            if (add.length > 0) {
              const list: ActionStrategy[] = [];
              if (isClient) {
                const currentPage = (selectUnifiedState(concepts, semaphore) as UserInterfaceClientState).currentPage;
                for (let i = 0; i < add.length; i++) {
                  // eslint-disable-next-line max-depth
                  if (currentPage === add[i].name) {
                    list.push(userInterfaceAddNewPageStrategy(
                      logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name)
                    ));
                  }
                }
                const strategies = strategySequence(list);
                if (strategies) {
                  dispatch(strategyBegin(strategies), {
                    iterateStage: true
                  });
                  // eslint-disable-next-line max-depth
                }
              } else {
                cachedTrainingDataNames = trainingDataNames;
                for (let i = 0; i < add.length; i++) {
                  list.push(userInterfaceAddNewPageStrategy(
                    logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name)
                  ));
                }
                const strategies = strategySequence(list);
                if (strategies) {
                  dispatch(strategyBegin(strategies), {
                    throttle: 1
                  });
                  // eslint-disable-next-line max-depth
                }
              }
            }
          }
        }
        if (state === undefined) {
          plan.conclude();
        }
      },
      () => {
        plan.conclude();
      }
    ]);
  };