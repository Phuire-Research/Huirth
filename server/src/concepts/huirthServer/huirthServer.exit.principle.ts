/*<$
For the graph programming framework Stratimux and Brand Concept huirth that extends the Server Concept, generate a principle that close the axium if a message is received at a specified api endpoint.
$>*/

import { ServerState } from '../server/server.concept';
import { HuirthServerPrinciple } from './huirthServer.concept';

/*<#*/
export const huirthServerExitPrinciple: HuirthServerPrinciple = ({
  plan,
  k_,
  concepts_
}) => {
  let shouldClose = false;
  const beat = 333;
  const initialServerState = k_.state(concepts_) as unknown as ServerState;
  const server = initialServerState.server;
  plan('Server listening for exit signal', ({stage}) => [
    stage(({concepts, dispatch, d, k, stagePlanner}) => {
      const name = k.name(concepts);
      if (name) {
        dispatch(d.axium.e.axiumRegisterStagePlanner({ conceptName: name, stagePlanner }), {
          iterateStage: true,
        });
      } else {
        stagePlanner.conclude();
      }
    }),
    stage(
      ({concepts, dispatch, d, k, stagePlanner}) => {
        const name = k.name(concepts);
        if (name) {
          if (shouldClose) {
            dispatch(
              d.axium.e.axiumPreClose({
                exit: true,
              }),
              {
                iterateStage: true,
              }
            );
          }
        } else {
          stagePlanner.conclude();
        }
      },
      { beat }
    ),
    stage(({stagePlanner}) => {
      stagePlanner.conclude();
    }),
  ]);

  server.get('/server/axiumEXIT', (__, req) => {
    shouldClose = true;
    req.json({
      exit: shouldClose,
    });
  });
};
/*#>*/
