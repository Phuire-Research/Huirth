/*<$
For the graph programming framework Stratimux generate a Hello World Concept.
$>*/
/*<#*/
import { MuxiumDeck, Concept, createConcept, PrincipleFunction } from 'stratimux';
import { helloWorld } from './qualities/helloWorld.quality';
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

const qualities = { helloWorld };

export type HelloWorldDeck = {
  helloWorld: Concept<HelloWorldState, typeof qualities>;
};

export type HelloWorldPrinciple = PrincipleFunction<typeof qualities, MuxiumDeck & HelloWorldDeck, HelloWorldState>;

export const createHelloWorldConcept = (something?: string) => {
  return createConcept(helloWorldName, createHelloWorldState(), qualities, [helloWorldPrinciple], []);
};
/*#>*/
