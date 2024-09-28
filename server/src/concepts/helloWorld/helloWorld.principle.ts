/*<$
For the graph programming framework Stratimux generate a Hello World Concept.
$>*/
/*<#*/
import { helloWorldName, HelloWorldPrinciple } from './helloWorld.concept';

export const helloWorldPrinciple: HelloWorldPrinciple = ({
  plan
}) => {
  const stagePlanner = plan('Hello World Plan', ({stage, d__, stageO}) => [
    stageO(() => d__.muxium.e.muxiumRegisterStagePlanner({ conceptName: helloWorldName, stagePlanner })),
    stage(({dispatch, e}) => {
      dispatch(e.helloWorld(), {
        iterateStage: true,
      });
    }),
    stage(() => {
      stagePlanner.conclude();
    }),
  ]);
};
/*#>*/
