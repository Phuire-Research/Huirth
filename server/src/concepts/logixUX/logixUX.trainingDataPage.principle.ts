/*<$
For the graph programming framework Stratimux and the brand concept logixUX, generate a principle that will create pages based upon the loaded data sets assigned to state.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import { Action, ActionStrategy, Concepts, PrincipleFunction, UnifiedSubject, axiumKick, axiumRegisterStagePlanner, getUnifiedName, selectUnifiedState, strategyBegin, strategySequence } from 'stratimux';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceState } from '../userInterface/userInterface.concept';
import { LogixUXState } from './logixUX.concept';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';
import { userInterfaceAddNewPageStrategy } from '../userInterface/strategies.ts/addNewPage.strategy';
import { logixUXGeneratedTrainingDataPageStrategy } from './strategies/pages/generatedTrainingDataPage.strategy';
import { DataSetTypes, ProjectStatus } from './logixUX.model';
import { logixUXUpdateProjectStatusStrategy } from './strategies/updateProjectStatus.strategy';

export const logixUXTrainingDataPagePrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    let cachedTrainingDataNames: string[] = [];
    let delayDetection = false;
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
          trainingData.forEach((data, i) => {
            add.push({
              i,
              name: data.name
            });
            return data.name;
          });
          if (add.length > 0) {
            const list: ActionStrategy[] = [];
            if (isClient) {
              const currentPage = (selectUnifiedState(concepts, semaphore) as UserInterfaceClientState).currentPage;
              let found = false;
              for (let i = 0; i < add.length; i++) {
                // eslint-disable-next-line max-depth
                if (currentPage === add[i].name) {
                  list.push(userInterfaceAddNewPageStrategy(
                    logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name),
                    concepts,
                  ));
                  found = true;
                }
                if (currentPage === 'dataManager' && trainingData[add[i].i].type === DataSetTypes.project) {
                  console.log('CHECK SET STATUS TO PARSE', trainingData[add[i].i].name);
                  list.push(logixUXUpdateProjectStatusStrategy(trainingData[add[i].i].name, ProjectStatus.parsed));
                }
              }
              if (!found) {
                dispatch(axiumKick(), {
                  setStage: 4
                });
              }
              const strategies = strategySequence(list);
              if (strategies) {
                dispatch(strategyBegin(strategies), {
                  setStage: 4
                });
                // eslint-disable-next-line max-depth
              }
            } else {
              for (let i = 0; i < add.length; i++) {
                list.push(userInterfaceAddNewPageStrategy(
                  logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name),
                  concepts,
                ));
                cachedTrainingDataNames.push(add[i].name);
                break;
              }
              const strategies = strategySequence(list);
              if (strategies) {
                console.log(strategies);
                const action = strategyBegin(strategies);
                dispatch(action, {
                  setStage: 3
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
        if (state && trainingData && cachedTrainingDataNames.length !== trainingData.length) {
          const add: {
            i: number,
            name: string
          }[] = [];
          const remove: {
            i: number,
            name: string
          }[] = [];
          for (const [i, data] of trainingData.entries()) {
            let found = false;
            let removed = false;
            for (const [index, name] of cachedTrainingDataNames.entries()) {
              if (data.name === name) {
                found = true;
                break;
              }
              if (
                data.name !== name &&
                trainingData.length < cachedTrainingDataNames.length &&
                i === trainingData.length - 1 &&
                !found
              ) {
                removed = true;
                remove.push({
                  i: index,
                  name,
                });
              }
            }
            if (!found && !removed) {
              add.push({
                i,
                name: data.name
              });
              break;
            }
          }
          if (add.length > 0 || remove.length > 0) {
            if (add.length > 0) {
              const list: ActionStrategy[] = [];
              for (let i = 0; i < add.length; i++) {
                const name = trainingData[add[i].i].name;
                console.log('CHECK TRAINING DATA NAMES', name, add[i].i);
                list.push(userInterfaceAddNewPageStrategy(
                  logixUXGeneratedTrainingDataPageStrategy(name),
                  concepts,
                ));
                break;
              }
              const strategies = strategySequence(list);
              if (strategies) {
                console.log('DISPATCHED');
                cachedTrainingDataNames.push(add[0].name);
                dispatch(strategyBegin(strategies), {
                  iterateStage: true
                });
                // eslint-disable-next-line max-depth
              }
            }
          }
        }
        if (state === undefined) {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        if (!delayDetection) {
          delayDetection = true;
          setTimeout(() => {
            const state = selectUnifiedState<LogixUXState & UserInterfaceState>(concepts, semaphore);
            if (state) {
              const pageNames = state.pages.map(p => p.title);
              console.log(pageNames, cachedTrainingDataNames);
              cachedTrainingDataNames = cachedTrainingDataNames.filter(name => pageNames.includes(name));
              delayDetection = false;
              dispatch(axiumKick(), {
                setStage: 2
              });
            } else {
              plan.conclude();
            }
          }, 400);
        }
      },
      () => {
        plan.conclude();
      }
    ]);
  };
/*#>*/