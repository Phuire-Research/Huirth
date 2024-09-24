/*<$
For the graph programming framework Stratimux and a huirth Concept, generate a Principle that will detect the Axium's dialog and only will loaded on the client.
$>*/
/*<#*/
import {
  getAxiumState,
} from '@phuire/stratimux';
import _ws from 'express-ws';
import { userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';
import { HuirthPrinciple} from './huirth.concept';

let topic = '';
export const huirthDialogPrinciple: HuirthPrinciple = ({
  plan,
}) => {
  const beat = 500;
  plan('Observe Axium Dialog and append to State', ({stage}) => [
    stage(({concepts, dispatch, d, k, stagePlanner}) => {
      const conceptName = k.name(concepts);
      if (conceptName && conceptName === userInterfaceClientName) {
        dispatch(d.axium.e.axiumRegisterStagePlanner({ conceptName, stagePlanner }), {
          iterateStage: true,
        });
      } else {
        stagePlanner.conclude();
      }
    }),
    stage(
      ({concepts, dispatch, e }) => {
        const axiumTopic = getAxiumState(concepts).lastStrategy;
        const axiumDialog = getAxiumState(concepts).lastStrategyDialog;
        // console.log(`TOPIC: ${topic}, AXIUM TOPIC: ${axiumTopic}`);
        if (topic !== axiumTopic) {
          topic = axiumTopic;
          const setDialog = e.huirthAppendAxiumDialog({
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
