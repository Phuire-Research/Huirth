/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate principle that will dispatch a initialization strategy.
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
  getUnifiedName,
  selectState,
  strategyBegin,
} from '@phuire/stratimux';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import { huirthServerInitializationStrategy } from './strategies/initialization.strategy';

export const huirthServerPrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  _cpts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const plan = concepts$.plan('huirthServer initialization plan', [
    createStage((concepts, dispatch) => {
      const conceptName = getUnifiedName(concepts, semaphore);
      if (conceptName) {
        dispatch(axiumRegisterStagePlanner({ conceptName, stagePlanner: plan }), {
          iterateStage: true,
        });
      } else {
        plan.conclude();
      }
    }),
    createStage((concepts, dispatch) => {
      const root = selectState<FileSystemState>(concepts, fileSystemName)?.root;
      if (root) {
        dispatch(strategyBegin(huirthServerInitializationStrategy(root)), {
          iterateStage: true,
        });
      } else {
        plan.conclude();
      }
    }),
    createStage((__, ___) => {
      plan.conclude();
    }),
  ]);
};
/*#>*/
