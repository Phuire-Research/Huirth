import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  getAxiumState,
  getUnifiedName,
  selectUnifiedState,
} from 'stratimux';
import _ws from 'express-ws';
import { logixUXAppendAxiumDialog } from './qualities/appendAxiumDialog.quality';
import { userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';
import { LogixUXState } from './logixUX.concept';
import { UserInterfaceState } from '../userInterface/userInterface.concept';
import { logixUXGeneratedTrainingDataPageStrategy } from './strategies/pages/generatedTrainingDataPage.strategy';
import { PageStrategyCreators } from '../../model/userInterface';

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
  let cachedTrainingDataLength = initState.trainingData.length;
  let first = false;
  const hardPageStrategiesLength = initState.pageStrategies.length;
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
      if (state && trainingData && (cachedTrainingDataLength !== trainingData.length || !first)) {
        if (!first) {
          first = true;
        }
        const newPageStrategies: PageStrategyCreators[] = [];
        cachedTrainingDataLength = trainingData.length;
        for (let i = 0; i < hardPageStrategiesLength; i++) {
          newPageStrategies.push(state.pageStrategies[i]);
        }
        for (let i = 0; i < trainingData.length; i++) {
          const creator = logixUXGeneratedTrainingDataPageStrategy(trainingData[i].name);
          newPageStrategies.push(creator);
        }
        state.pageStrategies = newPageStrategies;
        concepts$.next(concepts);
      }
      if (state === undefined) {
        plan.conclude();
      }
    },
  ]);
};
