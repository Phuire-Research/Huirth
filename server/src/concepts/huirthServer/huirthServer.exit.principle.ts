/*<$
For the graph programming framework Stratimux and Brand Concept huirth that extends the Server Concept, generate a principle that close the axium if a message is received at a specified api endpoint.
$>*/

import { Subscriber } from 'rxjs';
import { Action, Concepts, PrincipleFunction, UnifiedSubject, axiumKick, axiumPreClose, axiumRegisterStagePlanner, createStage, getUnifiedName, isConceptLoaded, selectUnifiedState } from 'stratimux';
import { ServerState } from '../server/server.concept';

/*<#*/
export const huirthServerExitPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    let shouldClose = false;
    const beat = 333;
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const server = initialServerState.server;
    const plan = concepts$.plan('Server listening for exit signal', [
      createStage((concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      }),
      createStage((concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          if (shouldClose) {
            dispatch(axiumPreClose({
              exit: true
            }), {
              iterateStage: true
            });
          }
        } else {
          plan.conclude();
        }
      }, {beat}),
      createStage((__, ___) => {
        plan.conclude();
      }),
    ]);

    server.get('/server/axiumEXIT', (__, req) => {
      shouldClose = true;
      req.json({
        exit: shouldClose
      });
    });
  };
/*#>*/