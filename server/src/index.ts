/*<$*/
// PROMPT: For the framework Stratimux, generate a index file for a branded project logixUX that utilizes the Stratimux advanced project template to formalize a unified application.
/*$>*/
/*<#*/
import { createAxium, unifyConcepts } from 'stratimux';
import { createFileSystemConcept } from './concepts/fileSystem/fileSystem.concept';
import { createLogixUXConcept } from './concepts/logixUX/logixUX.concept';

import { argv } from 'process';
import {
  commandLineInterfaceDetermineGoal,
  commandLineInterfaceDeterminePort,
  commandLineInterfaceGoals
} from './model/commandLineInterface';
import { createUserInterfaceServerConcept } from './concepts/userInterfaceServer/userInterfaceServer.concept';
import { createLogixUXServerConcept } from './concepts/logixUXServer/logixUXServer.concept';

(() => {
  const goal = commandLineInterfaceDetermineGoal(argv);
  const port = commandLineInterfaceDeterminePort(argv);
  console.log('GOAL', goal);
  switch (goal) {
  case commandLineInterfaceGoals.simulate: {
    createAxium(`axium ${goal} logixUX`, [
      createUserInterfaceServerConcept(goal, {
        concept: unifyConcepts([createLogixUXServerConcept()], createLogixUXConcept()),
      }, port),
    ], true, true);
    break;
  }
  default: {
    createAxium(`axium ${goal} logixUX`, [
      createUserInterfaceServerConcept(goal, {
        concept: unifyConcepts([createLogixUXServerConcept()], createLogixUXConcept()),
      }, port),
      createFileSystemConcept()
    ], true, true);
    break;
  }
  }
})();
/*#>*/