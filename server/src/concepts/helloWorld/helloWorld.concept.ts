/*<$
For the graph programming framework Stratimux generate a Hello World Concept.
$>*/
/*<#*/
import { createConcept, Concept } from 'stratimux';
import { helloWorldQuality } from './qualities/helloWorld.quality';
import { helloWorldPrinciple } from './helloWorld.principle';

export type HelloWorldState = {
  //
};

export const helloWorldName = 'helloWorld';

const createHelloWorldState = (): HelloWorldState => {
  return {
    //'
  };
};

export const createHelloWorldConcept = (something?: string): Concept =>  {
  return createConcept(
    helloWorldName,
    createHelloWorldState(),
    [
      helloWorldQuality
    ],
    [helloWorldPrinciple],
    []
  );
};
/*#>*/