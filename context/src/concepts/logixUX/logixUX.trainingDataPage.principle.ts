/*<$
For the graph programming framework Stratimux and the brand concept logixUX, generate a principle that will create pages based upon the loaded data sets assigned to state.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import {
  Action,
  ActionStrategy,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumKick,
  axiumRegisterStagePlanner,
  getUnifiedName,
  selectUnifiedState,
  strategyBegin,
  strategySequence,
} from 'stratimux';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceState } from '../userInterface/userInterface.concept';
import { LogixUXState } from './logixUX.concept';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';
import { userInterfaceAddNewPageStrategy } from '../userInterface/strategies.ts/addNewPage.strategy';
import { logixUXGeneratedTrainingDataPageStrategy } from './strategies/pages/generatedTrainingDataPage.strategy';
import { DataSetTypes, ProjectStatus, TrainingData } from './logixUX.model';
import { logixUXUpdateProjectStatusStrategy } from './strategies/updateProjectStatus.strategy';
import { userInterfaceRemovePageStrategy } from '../userInterface/strategies.ts/removePage.strategy';

const namesChanged = (trainingData: TrainingData, cachedTrainingDataNames: string[]) => {
  if (trainingData.length !== cachedTrainingDataNames.length) {
    return true;
  } else {
    for (const data of trainingData) {
      let exists = false;
      for (const name of cachedTrainingDataNames) {
        if (data.name === name) {
          exists = true;
        }
      }
      if (!exists) {
        return true;
      }
    }
  }
  return false;
};

const determineAddRemove = (trainingData: TrainingData, cachedTrainingDataNames: string[]) => {
  const add: {
    i: number;
    name: string;
  }[] = [];
  const remove: {
    i: number;
    name: string;
  }[] = [];
  for (const [i, data] of trainingData.entries()) {
    let found = false;
    for (let index = 0; index < cachedTrainingDataNames.length; index++) {
      const name = cachedTrainingDataNames[index];
      if (data.name === name) {
        found = true;
        break;
      }
    }
    if (!found) {
      add.push({
        i,
        name: data.name,
      });
    }
  }
  for (let index = 0; index < cachedTrainingDataNames.length; index++) {
    const name = cachedTrainingDataNames[index];
    let found = false;
    for (const data of trainingData) {
      if (data.name === name) {
        found = true;
        break;
      }
    }
    if (!found) {
      remove.push({
        i: index,
        name,
      });
    }
  }
  return [add, remove];
};

export const logixUXTrainingDataPagePrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  let cachedTrainingDataNames: string[] = [];
  const isClient = userInterface_isClient();
  const plan = concepts$.stage(
    'Observe Training Data and modify Pages',
    [
      (concepts, dispatch) => {
        const state = selectUnifiedState<UserInterfaceState>(concepts, semaphore);
        const conceptName = getUnifiedName(concepts, semaphore);
        if (conceptName) {
          if (state && (state.pageStrategies.length === state.pages.length || isClient)) {
            dispatch(axiumRegisterStagePlanner({ conceptName, stagePlanner: plan }), {
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
            i: number;
            name: string;
          }[] = [];
          trainingData.forEach((data, i) => {
            add.push({
              i,
              name: data.name,
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
                  list.push(
                    userInterfaceAddNewPageStrategy(
                      add[i].name,
                      logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name),
                      concepts
                    )
                  );
                  found = true;
                }
                if (currentPage === 'dataManager' && trainingData[add[i].i].type === DataSetTypes.project) {
                  list.push(logixUXUpdateProjectStatusStrategy(trainingData[add[i].i].name, ProjectStatus.parsed));
                }
              }
              if (!found) {
                dispatch(axiumKick(), {
                  setStage: 4,
                });
              }
              const strategies = strategySequence(list);
              if (strategies) {
                dispatch(strategyBegin(strategies), {
                  setStage: 4,
                });
                // eslint-disable-next-line max-depth
              }
            } else {
              for (let i = 0; i < add.length; i++) {
                list.push(
                  userInterfaceAddNewPageStrategy(
                    add[i].name,
                    logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name),
                    concepts
                  )
                );
                cachedTrainingDataNames.push(add[i].name);
              }
              const strategies = strategySequence(list);
              if (strategies) {
                console.log(strategies);
                const action = strategyBegin(strategies);
                dispatch(action, {
                  setStage: 3,
                });
              }
            }
          }
        }
        if (state === undefined) {
          console.log("THIS PLAN SHOULDN'T CONCLUDE YET");
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const state = selectUnifiedState<LogixUXState & UserInterfaceState>(concepts, semaphore);
        const trainingData = state?.trainingData;
        const changed = namesChanged(trainingData as TrainingData, cachedTrainingDataNames);
        if (state && trainingData && changed) {
          const [add, remove] = determineAddRemove(trainingData, cachedTrainingDataNames);
          if (add.length > 0 || remove.length > 0) {
            let list: ActionStrategy[] = [];
            if (add.length > 0) {
              for (let i = 0; i < add.length; i++) {
                const name = trainingData[add[i].i].name;
                cachedTrainingDataNames.push(name);
                list.push(userInterfaceAddNewPageStrategy(name, logixUXGeneratedTrainingDataPageStrategy(name), concepts));
              }
            }
            if (remove.length > 0) {
              cachedTrainingDataNames = cachedTrainingDataNames.filter((n) => {
                for (const r of remove) {
                  if (r.name.toLocaleLowerCase() === n.toLocaleLowerCase()) {
                    const removeStr = userInterfaceRemovePageStrategy(n);
                    removeStr.topic += 'Removing : ' + n;
                    list = [removeStr, ...list];
                    return false;
                  }
                }
                return true;
              });
            }
            if (list.length > 0) {
              const strategies = strategySequence(list) as ActionStrategy;
              dispatch(strategyBegin(strategies), {
                iterateStage: true,
              });
            }
          }
        } else if (state === undefined) {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const state = selectUnifiedState<LogixUXState & UserInterfaceState>(concepts, semaphore);
        if (state) {
          const pageNames = state.pages.map((p) => p.title);
          console.log(pageNames, cachedTrainingDataNames);
          cachedTrainingDataNames = cachedTrainingDataNames.filter((name) => pageNames.includes(name));
          dispatch(axiumKick(), {
            setStage: 2,
          });
        } else {
          plan.conclude();
        }
      },
      () => {
        plan.conclude();
      },
    ],
    333
  );
};
/*#>*/
