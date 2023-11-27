/*<$
For the graph programming framework Stratimux and a Concept logixUX Server, generate principle that will dispatch a initialization strategy.
$>*/
/*<#*/
import { Subscriber } from 'rxjs';
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumRegisterStagePlanner,
  getUnifiedName,
  selectState,
  strategyBegin,
} from 'stratimux';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import { logixUXServerInitializationStrategy } from './strategies/initialization.strategy';

export const logixUXServerPrinciple: PrincipleFunction =
  (_: Subscriber<Action>, _cpts: Concepts, concepts$: UnifiedSubject, semaphore: number) => {
    const plan = concepts$.stage('logixUXServer initialization plan', [
      (concepts, dispatch) => {
        const conceptName = getUnifiedName(concepts, semaphore);
        if (conceptName) {
          dispatch(axiumRegisterStagePlanner({conceptName, stagePlanner: plan}), {
            iterateStage: true,
          });
        } else {
          plan.conclude();
        }
      },
      (concepts, dispatch) => {
        const root = selectState<FileSystemState>(concepts, fileSystemName)?.root;
        if (root) {
          dispatch(strategyBegin(logixUXServerInitializationStrategy(root)), {
            iterateStage: true
          });
        } else {
          plan.conclude();
        }
      },
      (__, ___) => {
        plan.conclude();
      },
    ]);
  };
/*#>*/