/*<$
For the graph programming framework Stratimux and a huirth Concept, generate a Principle that will detect the Muxium's dialog and only will loaded on the client.
$>*/
/*<#*/
import { getMuxiumState } from '@phuire/stratimux';
import _ws from 'express-ws';
import { userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';
import { HuirthPrinciple } from './huirth.concept';

let topic = '';
export const huirthDialogPrinciple: HuirthPrinciple = ({ plan }) => {
  const beat = 500;
  plan('Observe Muxium Dialog and append to State', ({ stage }) => [
    stage(({ concepts, dispatch, d, k, stagePlanner }) => {
      const conceptName = k.name(concepts);
      if (conceptName && conceptName === userInterfaceClientName) {
        dispatch(d.muxium.e.muxiumRegisterStagePlanner({ conceptName, stagePlanner }), {
          iterateStage: true,
        });
      } else {
        stagePlanner.conclude();
      }
    }),
    stage(
      ({ concepts, dispatch, e }) => {
        const muxiumTopic = getMuxiumState(concepts).lastStrategy;
        const muxiumDialog = getMuxiumState(concepts).lastStrategyDialog;
        // console.log(`TOPIC: ${topic}, AXIUM TOPIC: ${muxiumTopic}`);
        if (topic !== muxiumTopic) {
          topic = muxiumTopic;
          const setDialog = e.huirthAppendMuxiumDialog({
            dialog: muxiumDialog,
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
