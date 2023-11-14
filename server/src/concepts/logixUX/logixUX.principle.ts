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
import { logixUXDisableTriggerSaveFlag } from './qualities/disableTriggerSaveFlag.quality';

let topic = '';
export const logixUXDialogPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
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
        // console.log(`TOPIC: ${topic}, AXIUM TOPIC: ${axiumTopic}`);
        if (topic !== axiumTopic) {
          topic = axiumTopic;
          dispatch(logixUXAppendAxiumDialog({
            dialog: axiumDialog
          }), {
            throttle: 1
          });
        }
      }
    ]);
  };
export const logixUXDisableSave: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    let enable = true;
    const plan = concepts$.stage('Observe Axium Disable Save Flag', [
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
        const state = selectUnifiedState<LogixUXState>(concepts, semaphore);
        if (state) {
          if (state.triggerSave) {
            if (enable) {
              enable = false;
              setTimeout(() => {
                dispatch(logixUXDisableTriggerSaveFlag(), {
                  throttle: 40
                });
              }, 10);
            }
          }
        } else {
          plan.conclude();
        }
      }
    ]);
  };