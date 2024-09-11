/*<$
For the graph programming framework Stratimux and a huirth Concept, generate a Principle that will detect the Axium's dialog and only will loaded on the client.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  createStage,
  getAxiumState,
  getUnifiedName,
} from '@phuire/stratimux';
import _ws from 'express-ws';
import { huirthAppendAxiumDialog } from './qualities/appendAxiumDialog.quality';
import { userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';

let topic = '';
export const huirthDialogPrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const beat = 500;
  const plan = concepts$.plan('Observe Axium Dialog and append to State', [
    createStage((concepts, dispatch) => {
      const conceptName = getUnifiedName(concepts, semaphore);
      if (conceptName && conceptName === userInterfaceClientName) {
        dispatch(axiumRegisterStagePlanner({ conceptName, stagePlanner: plan }), {
          iterateStage: true,
        });
      } else {
        plan.conclude();
      }
    }),
    createStage(
      (concepts, dispatch) => {
        const axiumTopic = getAxiumState(concepts).lastStrategy;
        const axiumDialog = getAxiumState(concepts).lastStrategyDialog;
        // console.log(`TOPIC: ${topic}, AXIUM TOPIC: ${axiumTopic}`);
        if (topic !== axiumTopic) {
          topic = axiumTopic;
          const setDialog = huirthAppendAxiumDialog({
            dialog: axiumDialog,
          });
          dispatch(setDialog, {
            throttle: 1,
          });
        }
      },
      { beat }
    ),
  ]);
};
/*#>*/
