import { createAxium } from 'stratimux';
import { createFileSystemConcept } from './concepts/fileSystem/fileSystem.concept';
import { createLogixUXConcept } from './concepts/logixUX/logixUX.concept';

import { argv } from 'process';
import {
  commandLineInterfaceDetermineGoal,
  commandLineInterfaceDeterminePort,
  commandLineInterfaceGoals
} from './model/commandLineInterface';
import { createUserInterfaceServerConcept } from './concepts/userInterfaceServer/userInterfaceServer.concept';

(() => {
  const goal = commandLineInterfaceDetermineGoal(argv);
  const port = commandLineInterfaceDeterminePort(argv);
  console.log('GOAL', goal);
  switch (goal) {
  case commandLineInterfaceGoals.simulate: {
    createAxium(`axium ${goal} logixUX`, [
      createUserInterfaceServerConcept(goal, {
        concept: createLogixUXConcept(),
      }, port),
    ], true, true);
    break;
  }
  default: {
    createAxium(`axium ${commandLineInterfaceGoals.dynamicDeployment} logixUX`, [
      createUserInterfaceServerConcept(goal, {
        concept: createLogixUXConcept(),
      }, port),
      createFileSystemConcept()
    ], true, true);
    break;
  }
  }
})();
