/*<$
For the graph programming framework Stratimux and Brand Concept logixUX that extends the Server Concept, generate a principle that close the axium if a message is received at a specified api endpoint.
$>*/

import { Subscriber } from 'rxjs';
import { Action, Concepts, PrincipleFunction, UnifiedSubject, axiumPreClose, axiumRegisterStagePlanner, getUnifiedName, isConceptLoaded, selectUnifiedState } from 'stratimux';
import { ServerState } from '../server/server.concept';

/*<#*/
export const logixUXServerExitPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    let shouldClose = false;
    const initialServerState = selectUnifiedState(cpts, semaphore) as ServerState;
    const server = initialServerState.server;
    const plan = concepts$.stage('Server listening for exit signal', [
      (concepts, dispatch) => {
        const name = getUnifiedName(concepts, semaphore);
        if (name) {
          dispatch(axiumRegisterStagePlanner({conceptName: name, stagePlanner: plan}), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
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
      },
      () => {
        plan.conclude();
      }
    ], 333);

    server.get('/axiumEXIT', (__, req) => {
      shouldClose = true;
      req.json({
        exit: shouldClose
      });
    });
  };
/*#>*/