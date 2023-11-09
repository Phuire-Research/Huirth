import { Concept, PrincipleFunction, Quality, createConcept, unifyConcepts } from 'stratimux';
import { createServerConcept, serverName } from '../server/server.concept';
import { userInterfaceServerPrinciple } from './userInterfaceServer.principle';
import { commandLineInterfaceGoals } from '../../model/commandLineInterface';
import {
  UserInterfaceState,
  createUserInterfaceConcept,
  userInterfaceName,
} from '../userInterface/userInterface.concept';
import { userInterfaceServerBuildContextQuality } from './qualities/buildContext.quality';
import { userInterfaceServerContextPrinciple } from './userInterfaceServer.context.principle';
import { userInterfaceServerCreateEachPageHtmlQuality } from './qualities/createEachPageHtml.quality';
import { userInterfaceServerRecursivelyCreateEachPageHtmlQuality } from './qualities/recursivelyCreateEachPageHtml.quality';
import { userInterfaceServerCreateContextIndexQuality } from './qualities/createContextIndex.quality';
import { helloWorldPageStrategy } from '../userInterface/strategies.ts/helloWorldPage.strategy';
import { userInterfaceServerFormatContextQuality } from './qualities/formatContext.quality';
import { PageStrategyCreators } from '../../model/userInterface';
import { htmlName } from '../html/html.concepts';

// eslint-disable-next-line no-shadow
export enum workingConceptCategory {
  folder = 'folder',
  import = 'import'
}

export const userInterfaceServerName = 'userInterfaceServer';

export type UserInterfaceServerState = {
  createClientIndexQue: string[];
  brand?: string;
  goal: string,
} & UserInterfaceState

const createUserInterfaceServerState =
  (pageStrategies: PageStrategyCreators[], goal: commandLineInterfaceGoals): UserInterfaceServerState => {
    return {
      pages: [],
      pageStrategies,
      pagesCached: false,
      createClientIndexQue: [],
      goal
    };
  };

const principleGoal = (goal: commandLineInterfaceGoals): PrincipleFunction[] => {
  switch (goal) {
  case commandLineInterfaceGoals.simulate: {
    return [
    ];
  }
  case commandLineInterfaceGoals.none: {
    return [];
  }
  default: {
    return [
      userInterfaceServerContextPrinciple
    ];
  }
  }
};

const qualityGoal = (goal: commandLineInterfaceGoals): Quality[] => {
  switch (goal) {
  case commandLineInterfaceGoals.simulate: {
    return [
    ];
  }
  default: {
    return [
      userInterfaceServerCreateEachPageHtmlQuality,
      userInterfaceServerRecursivelyCreateEachPageHtmlQuality,
      userInterfaceServerCreateContextIndexQuality,
      userInterfaceServerBuildContextQuality,
      userInterfaceServerFormatContextQuality
    ];
  }
  }
};

const baseUserInterfaceServerConcept = (goal: commandLineInterfaceGoals, pageStrategies: PageStrategyCreators[]) => {
  return unifyConcepts([
    createUserInterfaceConcept([]),
  ],
  createConcept(
    userInterfaceServerName,
    createUserInterfaceServerState(pageStrategies, goal),
    [
      userInterfaceServerBuildContextQuality,
      ...qualityGoal(goal)
    ],
    [
      userInterfaceServerPrinciple,
      ...principleGoal(goal),
    ],
  ));
};

const unifyBrandConcept = (goal: commandLineInterfaceGoals, brand: {
  name: string,
  concept: Concept,
  pageStrategies: PageStrategyCreators[]
}) => {
  const unified = unifyConcepts([
    brand.concept,
  ],

  baseUserInterfaceServerConcept(goal, brand.pageStrategies)
  );
  (unified.state as UserInterfaceServerState).brand = brand.name;
  return unified;
};

const userInterfaceServerConcept = (goal: commandLineInterfaceGoals, brand?: {
  name: string,
  concept: Concept,
  pageStrategies: PageStrategyCreators[]
}): Concept =>  {
  if (brand) {
    return unifyBrandConcept(goal, brand);
  }
  return baseUserInterfaceServerConcept(goal, [helloWorldPageStrategy]);
};

export const createUserInterfaceServerConcept = (goal: commandLineInterfaceGoals, brand?: {
  name: string,
  concept: Concept,
  pageStrategies: PageStrategyCreators[]
}, port?: number) => {
  const serverConcept = createServerConcept(port);
  const unified = unifyConcepts([serverConcept], userInterfaceServerConcept(goal, brand));
  return unified;
};
