/*<$
For the graph programming framework Stratimux, generate a index file for a branded project huirth that utilizes the Stratimux advanced project template to formalize a unified application.
$>*/
/*<#*/
import { createAxium, unifyConcepts } from 'stratimux';
import { createFileSystemConcept } from './concepts/fileSystem/fileSystem.concept';
import { createhuirthConcept } from './concepts/huirth/huirth.concept';

import { argv } from 'process';
import {
  commandLineInterfaceDetermineGoal,
  commandLineInterfaceDeterminePort,
  commandLineInterfaceGoals
} from './model/commandLineInterface';
import { createUserInterfaceServerConcept } from './concepts/userInterfaceServer/userInterfaceServer.concept';
import { createhuirthServerConcept } from './concepts/huirthServer/huirthServer.concept';

(() => {
  const goal = commandLineInterfaceDetermineGoal(argv);
  const port = commandLineInterfaceDeterminePort(argv);
  console.log('GOAL', goal);
  switch (goal) {
  case commandLineInterfaceGoals.simulate: {
    createAxium(`axium ${goal} huirth`, [
      createUserInterfaceServerConcept(goal, {
        concept: unifyConcepts([createhuirthServerConcept()], createhuirthConcept()),
      }, port),
    ], true, true);
    break;
  }
  default: {
    createAxium(`axium ${goal} huirth`, [
      createUserInterfaceServerConcept(goal, {
        concept: unifyConcepts([createhuirthServerConcept()], createhuirthConcept()),
      }, port),
      createFileSystemConcept()
    ], true, true);
    break;
  }
  }
})();
/*#>*/