import { Subscriber } from 'rxjs';
import {
  Action,
  ActionStrategy,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  getAxiumState,
  getUnifiedName,
  selectUnifiedState,
  strategyBegin,
  strategySequence,
} from 'stratimux';
import _ws from 'express-ws';
import { logixUXAppendAxiumDialog } from './qualities/appendAxiumDialog.quality';
import { UserInterfaceClientState, userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';
import { LogixUXState } from './logixUX.concept';
import { UserInterfaceState } from '../userInterface/userInterface.concept';
import { logixUXGeneratedTrainingDataPageStrategy } from './strategies/pages/generatedTrainingDataPage.strategy';
import { PageStrategyCreators, userInterface_isClient } from '../../model/userInterface';
import { userInterfaceAddNewPage } from '../userInterface/qualities/addNewPage.quality';
import { userInterfaceAddNewPageStrategy, userInterfaceAddNewPageStrategyTopic } from '../userInterface/strategies.ts/addNewPage.strategy';

let topic = '';
export const logixUXDialogPrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const plan = concepts$.stage('Observe Axium Dialog and append to State', [
    (concepts, dispatch) => {
      const conceptName = getUnifiedName(concepts, semaphore);
      if (conceptName && conceptName === userInterfaceClientName) {
        dispatch(axiumRegisterStagePlanner({ conceptName, stagePlanner: plan }), {
          iterateStage: true,
        });
      } else {
        plan.conclude();
      }
    },
    (concepts, dispatch) => {
      const axiumTopic = getAxiumState(concepts).lastStrategy;
      const axiumDialog = getAxiumState(concepts).lastStrategyDialog;
      // console.log(`TOPIC: ${topic}, AXIUM TOPIC: ${axiumTopic}`);
      if (topic !== axiumTopic) {
        topic = axiumTopic;
        dispatch(
          logixUXAppendAxiumDialog({
            dialog: axiumDialog,
          }),
          {
            throttle: 1,
          }
        );
      }
    },
  ]);
};
export const logixUXTrainingDataPagePrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const initState = selectUnifiedState(cpts, semaphore) as LogixUXState & UserInterfaceState;
  let cachedTrainingDataNames = initState.trainingData.map((data) => data.name);
  const isClient = userInterface_isClient();
  const plan = concepts$.stage('Observe Training Data and modify Pages', [
    (concepts, dispatch) => {
      const conceptName = getUnifiedName(concepts, semaphore);
      if (conceptName) {
        dispatch(axiumRegisterStagePlanner({ conceptName, stagePlanner: plan }), {
          iterateStage: true,
        });
      } else {
        plan.conclude();
      }
    },
    (concepts, dispatch) => {
      const state = selectUnifiedState<LogixUXState & UserInterfaceState>(concepts, semaphore);
      const trainingData = state?.trainingData;
      if (state && trainingData) {
        const add: {
          i: number;
          name: string;
        }[] = [];
        const remove: {
          i: number;
          name: string;
        }[] = [];
        const trainingDataNames = trainingData.map((data, i) => {
          let found = false;
          let removed = false;
          let first = false;
          if (cachedTrainingDataNames.length === 0) {
            first = true;
            add.push({
              i,
              name: data.name,
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
              name: data.name,
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
                  list.push(userInterfaceAddNewPageStrategy(logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name)));
                }
              }
            } else {
              cachedTrainingDataNames = trainingDataNames;
              for (let i = 0; i < add.length; i++) {
                list.push(userInterfaceAddNewPageStrategy(logixUXGeneratedTrainingDataPageStrategy(trainingData[add[i].i].name)));
              }
              const strategies = strategySequence(list);
              if (strategies) {
                dispatch(strategyBegin(strategies), {
                  throttle: 1,
                });
                // eslint-disable-next-line max-depth
                if (isClient) {
                  plan.conclude();
                }
              }
            }
          }
        }
      }
      if (state === undefined) {
        plan.conclude();
      }
    },
  ]);
};
