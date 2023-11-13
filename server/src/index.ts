import { createAxium } from 'stratimux';
import { createFileSystemConcept } from './concepts/fileSystem/fileSystem.concept';
import { createLogixUXConcept, logixUXName } from './concepts/logixUX/logixUX.concept';
import { logixUXIndexPageStrategy } from './concepts/logixUX/strategies/indexPage.strategy';
import { logixUXErrorPageStrategy } from './concepts/logixUX/strategies/errorPage.strategy';

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
        name: logixUXName,
        concept: createLogixUXConcept(),
        pageStrategies: [logixUXIndexPageStrategy, logixUXErrorPageStrategy]
      }, port),
    ], true, true);
    break;
  }
  default: {
    createAxium(`axium ${commandLineInterfaceGoals.dynamicDeployment} logixUX`, [
      createUserInterfaceServerConcept(goal, {
        name: logixUXName,
        concept: createLogixUXConcept(),
        pageStrategies: [logixUXIndexPageStrategy, logixUXErrorPageStrategy]
      }, port),
      createFileSystemConcept()
    ], true, true);
    break;
  }
  }
})();
