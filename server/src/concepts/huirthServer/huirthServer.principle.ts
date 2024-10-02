/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate principle that will dispatch a initialization strategy.
$>*/
/*<#*/
import { createStage, selectState, strategyBegin } from '@phuire/stratimux';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import { huirthServerInitializationStrategy } from './strategies/initialization.strategy';
import { HuirthServerPrinciple } from './huirthServer.concept';

export const huirthServerPrinciple: HuirthServerPrinciple = ({ plan }) => {
  plan('huirthServer initialization plan', ({ stage }) => [
    stage(({ concepts, dispatch, d, k, stagePlanner }) => {
      const conceptName = k.name(concepts);
      if (conceptName) {
        dispatch(d.muxium.e.muxiumRegisterStagePlanner({ conceptName, stagePlanner }), {
          iterateStage: true,
        });
      } else {
        stagePlanner.conclude();
      }
    }),
    stage(({ concepts, dispatch, stagePlanner }) => {
      const root = selectState<FileSystemState>(concepts, fileSystemName)?.root;
      if (root) {
        dispatch(strategyBegin(huirthServerInitializationStrategy(root)), {
          iterateStage: true,
        });
      } else {
        stagePlanner.conclude();
      }
    }),
    createStage(({ stagePlanner }) => {
      stagePlanner.conclude();
    }),
  ]);
};
/*#>*/
