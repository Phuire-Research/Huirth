/*<$
For the graph programming framework Stratimux, generate a index file for a branded project huirth that utilizes the Stratimux advanced project template to formalize a unified application.
$>*/
/*<#*/
import { muxification, muxifyConcepts } from 'stratimux';
import { createFileSystemConcept } from './concepts/fileSystem/fileSystem.concept';
import { createHuirthConcept } from './concepts/huirth/huirth.concept';

import { argv } from 'process';
import {
  commandLineInterfaceDetermineGoal,
  commandLineInterfaceDeterminePort,
  commandLineInterfaceGoals,
} from './model/commandLineInterface';
import { createUserInterfaceServerConcept } from './concepts/userInterfaceServer/userInterfaceServer.concept';
import { createHuirthServerConcept } from './concepts/huirthServer/huirthServer.concept';

(() => {
  const goal = commandLineInterfaceDetermineGoal(argv);
  const port = commandLineInterfaceDeterminePort(argv);
  // console.log('GOAL', goal);
  switch (goal) {
    case commandLineInterfaceGoals.simulate: {
      muxification(
        `muxium ${goal} huirth`,
        {
          userInterfaceServer: createUserInterfaceServerConcept(
            goal,
            {
              concept: muxifyConcepts([createHuirthServerConcept()], createHuirthConcept()),
            },
            port
          ),
        },
        {
          logging: true,
          storeDialog: true,
          // logActionStream: true
        }
      );
      break;
    }
    default: {
      muxification(
        `muxium ${goal} huirth`,
        {
          userInterfaceServer: createUserInterfaceServerConcept(
            goal,
            {
              concept: muxifyConcepts([createHuirthServerConcept()], createHuirthConcept()),
            },
            port
          ),
          fileSystem: createFileSystemConcept(),
        },
        {
          logging: true,
          storeDialog: true,
          // logActionStream: true
        }
      );
      break;
    }
  }
})();
/*#>*/
