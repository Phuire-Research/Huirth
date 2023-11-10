import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  getAxiumState,
  getUnifiedName,
} from 'stratimux';
import _ws from 'express-ws';
import { logixUXAppendAxiumDialog } from './qualities/appendAxiumDialog.quality';
import { userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';

let topic = '';
export const logixUXDialogPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    console.log('CHECK CONCEPTS', cpts);
    const plan = concepts$.stage('Observe Axium Dialog and append to State', [
      (concepts, dispatch) => {
        const conceptName = getUnifiedName(concepts, semaphore);
        if (conceptName && conceptName === userInterfaceClientName) {
          dispatch(axiumRegisterStagePlanner({conceptName, stagePlanner: plan}), {
            iterateStage: true,
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const axiumTopic = getAxiumState(concepts).lastStrategy;
        const axiumDialog = getAxiumState(concepts).lastStrategyDialog;
        console.log(`TOPIC: ${topic}, AXIUM TOPIC: ${axiumTopic}`);
        if (topic !== axiumTopic) {
          topic = axiumTopic;
          dispatch(logixUXAppendAxiumDialog({
            dialog: axiumDialog
          }), {
            throttle: 50
          });
        }
      }
    ]);
  };