/*<$
For the graph programming framework Stratimux and the brand concept huirth, generate a principle that will create pages based upon the loaded data sets assigned to state.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import {
  Action,
  ActionStrategy,
  Concepts,
  KeyedSelector,
  PrincipleFunction,
  axiumKick,
  axiumRegisterStagePlanner,
  createStage,
  strategyBegin,
  strategySequence,
} from '@phuire/stratimux';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceState } from '../userInterface/userInterface.concept';
import { HuirthPrinciple, huirthState } from './huirth.concept';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';
import { userInterfaceAddNewPageStrategy } from '../userInterface/strategies.ts/addNewPage.strategy';
import { huirthGeneratedTrainingDataPageStrategy } from './strategies/pages/generatedTrainingDataPage.strategy';
import { DataSetTypes, ProjectStatus, TrainingData } from './huirth.model';
import { huirthUpdateProjectStatusStrategy } from './strategies/updateProjectStatus.strategy';
// import { userInterfaceRemovePageStrategy } from '../userInterface/strategies.ts/removePage.strategy';
import { huirth_createPageStrategiesSelector, huirth_createPagesSelector, huirth_createTrainingDataSelector } from './huirth.selector';
import { huirthAddTrainingDataPageStrategy, huirthAddTrainingDataPageStrategyTopic } from './strategies/addPageTrainingData.strategy';
// import { huirthRemoveTrainingDataPageStrategy } from './strategies/removeTrainingDataPage.strategy';

// const namesChanged = (trainingData: TrainingData, cachedTrainingDataNames: string[]) => {
//   if (trainingData.length !== cachedTrainingDataNames.length) {
//     return true;
//   } else {
//     for (const data of trainingData) {
//       let exists = false;
//       for (const name of cachedTrainingDataNames) {
//         if (data.name === name) {
//           exists = true;
//         }
//       }
//       if (!exists) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

// const determineAddRemove = (trainingData: TrainingData, cachedTrainingDataNames: string[]) => {
//   const add: {
//     i: number,
//     name: string
//   }[] = [];
//   const remove: {
//     i: number,
//     name: string
//   }[] = [];
//   for (const [i, data] of trainingData.entries()) {
//     let found = false;
//     for (let index = 0; index < cachedTrainingDataNames.length; index++) {
//       const name = cachedTrainingDataNames[index];
//       if (data.name === name) {
//         found = true;
//         break;
//       }
//     }
//     if (!found) {
//       add.push({
//         i,
//         name: data.name
//       });
//     }
//   }
//   for (let index = 0; index < cachedTrainingDataNames.length; index++) {
//     const name = cachedTrainingDataNames[index];
//     let found = false;
//     for (const data of trainingData) {
//       if (data.name === name) {
//         found = true;
//         break;
//       }
//     }
//     if (!found) {
//       remove.push({
//         i: index,
//         name,
//       });
//     }
//   }
//   return [
//     add, remove
//   ];
// };

export const huirthTrainingDataPagePrinciple: HuirthPrinciple = ({
  plan
}) => {
  const cachedTrainingDataNames: string[] = [];
  const beat = 33;
  const isClient = userInterface_isClient();
  plan('Observe Training Data and modify Pages', ({stage, k__}) => [
    stage(
      ({concepts, dispatch, d, k, stagePlanner}) => {
        const state = k.state(concepts) as unknown as UserInterfaceState;
        const conceptName = k.name(concepts);
        if (conceptName && state.pages) {
          if (state && (state.pageStrategies.length === state.pages.length || isClient)) {
            dispatch(d.axium.e.axiumRegisterStagePlanner({ conceptName, stagePlanner }), {
              iterateStage: true,
            });
          }
        } else {
          stagePlanner.conclude();
        }
      },
      {
        selectors: [
          k__.pages,
          k__.pageStrategies,
        ],
      }
    ),
    stage(
      ({concepts, dispatch, d, k, stagePlanner}) => {
        const state = k.state(concepts);
        const trainingData = state?.trainingData;
        if (state && trainingData && state?.trainingDataInitialized) {
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
              const currentPage = (state as unknown as UserInterfaceClientState).currentPage;
              let found = false;
              for (let i = 0; i < add.length; i++) {
                // eslint-disable-next-line max-depth
                if (currentPage === add[i].name) {
                  list.push(
                    huirthAddTrainingDataPageStrategy(
                      add[i].name,
                      huirthGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name),
                      concepts
                    )
                  );
                  found = true;
                }
                if (currentPage === 'dataManager' && trainingData[add[i].i].type === DataSetTypes.project) {
                  list.push(huirthUpdateProjectStatusStrategy(trainingData[add[i].i].name, ProjectStatus.parsed));
                }
              }
              if (!found) {
                dispatch(d.axium.e.axiumKick(), {
                  iterateStage: true,
                });
              }
              const strategies = strategySequence(list);
              if (strategies) {
                dispatch(strategyBegin(strategies), {
                  iterateStage: true,
                });
                // eslint-disable-next-line max-depth
              }
            } else {
              for (let i = 0; i < add.length; i++) {
                list.push(
                  userInterfaceAddNewPageStrategy(
                    add[i].name,
                    huirthGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name),
                    concepts
                  )
                );
                cachedTrainingDataNames.push(add[i].name);
              }
              const strategies = strategySequence(list);
              if (strategies) {
                console.log('strategies: ', strategies);
                const action = strategyBegin(strategies);
                dispatch(action, {
                  iterateStage: true,
                });
              }
            }
          }
        }
        if (state === undefined) {
          console.log('THIS PLAN SHOULDN\'T CONCLUDE YET');
          stagePlanner.conclude();
        }
      },
      { beat }
    ),
    stage(({stagePlanner}) => {
      stagePlanner.conclude();
    }),
    // createStage((concepts, dispatch, changes) => {
    //   const state = selectUnifiedState<huirthState & UserInterfaceState>(concepts, semaphore);
    //   const trainingData = state?.trainingData;
    //   // const changed = namesChanged(trainingData as TrainingData, cachedTrainingDataNames);
    //   if (state && trainingData && changes.length > 0) {
    //     const [
    //       add,
    //       remove
    //     ] = determineAddRemove(trainingData, cachedTrainingDataNames);
    //     if (add.length > 0 || (remove.length > 0)) {
    //       let list: ActionStrategy[] = [];
    //       if (remove.length > 0) {
    //         cachedTrainingDataNames = cachedTrainingDataNames.filter((n) => {
    //           for (const r of remove) {
    //             if (r.name.toLocaleLowerCase() === n.toLocaleLowerCase()) {
    //               const removeStr = huirthRemoveTrainingDataPageStrategy(n);
    //               removeStr.topic += 'Removing : ' + n;
    //               list = [removeStr, ...list];
    //               return false;
    //             }
    //           }
    //           return true;
    //         });
    //       }
    //       if (add.length > 0) {
    //         for (let i = 0; i < add.length; i++) {
    //           const name = trainingData[add[i].i].name;
    //           cachedTrainingDataNames.push(name);
    //           list.push(userInterfaceAddNewPageStrategy(
    //             name,
    //             huirthGeneratedTrainingDataPageStrategy(name),
    //             concepts,
    //           ));
    //         }
    //       }
    //       if (list.length > 0) {
    //         const strategies = strategySequence(list) as ActionStrategy;
    //         dispatch(strategyBegin(strategies), {
    //           // iterateStage: true
    //           throttle: 0,
    //         });
    //       }
    //     }
    //   } else if (state === undefined) {
    //     plan.conclude();
    //   }
    // }, {beat, selectors: [huirth_createTrainingDataSelector(cpts, semaphore) as KeyedSelector]}),
    // createStage((concepts, dispatch) => {
    //   const state = selectUnifiedState<huirthState & UserInterfaceState>(concepts, semaphore);
    //   if (state) {
    //     const pageNames = state.pages.map(p => p.title);
    //     console.log('pageNames: ', pageNames, cachedTrainingDataNames);
    //     cachedTrainingDataNames = cachedTrainingDataNames.filter(name => pageNames.includes(name));
    //     dispatch(axiumKick(), {
    //       setStage: 2
    //     });
    //   } else {
    //     plan.conclude();
    //   }
    // }, {beat}),
    stage(({stagePlanner}) => {
      stagePlanner.conclude();
    }),
  ]);
};
/*#>*/
