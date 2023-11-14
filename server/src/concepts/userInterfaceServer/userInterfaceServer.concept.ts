import { Concept, PrincipleFunction, Quality, createConcept, unifyConcepts } from 'stratimux';
import { createServerConcept, serverName } from '../server/server.concept';
import { userInterfaceServerOnChangePrinciple, userInterfaceServerPrinciple } from './userInterfaceServer.principle';
import { commandLineInterfaceGoals } from '../../model/commandLineInterface';
import {
  UserInterfaceState,
  createUserInterfaceConcept,
} from '../userInterface/userInterface.concept';
import { userInterfaceServerBuildContextQuality } from './qualities/buildContext.quality';
import { userInterfaceServerContextPrinciple } from './userInterfaceServer.context.principle';
import { userInterfaceServerCreateEachPageHtmlQuality } from './qualities/createEachPageHtml.quality';
import { userInterfaceServerRecursivelyCreateEachPageHtmlQuality } from './qualities/recursivelyCreateEachPageHtml.quality';
import { userInterfaceServerCreateContextIndexQuality } from './qualities/createContextIndex.quality';
import { helloWorldPageStrategy } from '../userInterface/strategies.ts/helloWorldPage.strategy';
import { userInterfaceServerFormatContextQuality } from './qualities/formatContext.quality';
import { PageStrategyCreators } from '../../model/userInterface';
import { userInterfaceServerAssembleActionQueStrategyQuality } from './qualities/serverAssembleActionQueStrategy.quality';
import { createWebSocketServerConcept } from '../webSocketServer/webSocketServer.concept';

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
      userInterfaceServerOnChangePrinciple
    ];
  }
  case commandLineInterfaceGoals.none: {
    return [];
  }
  default: {
    return [
      userInterfaceServerContextPrinciple,
      userInterfaceServerOnChangePrinciple
    ];
  }
  }
};

const qualityGoal = (goal: commandLineInterfaceGoals): Quality[] => {
  switch (goal) {
  case commandLineInterfaceGoals.simulate: {
    return [
      userInterfaceServerAssembleActionQueStrategyQuality
    ];
  }
  default: {
    return [
      userInterfaceServerCreateEachPageHtmlQuality,
      userInterfaceServerRecursivelyCreateEachPageHtmlQuality,
      userInterfaceServerCreateContextIndexQuality,
      userInterfaceServerBuildContextQuality,
      userInterfaceServerFormatContextQuality,
      userInterfaceServerAssembleActionQueStrategyQuality
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
  concept: Concept,
}) => {
  const base = baseUserInterfaceServerConcept(goal, []);
  base.name = '';
  const unified = unifyConcepts([
    base,
    brand.concept,
  ],
  createConcept(
    userInterfaceServerName,
    {}
  )
  );
  (unified.state as UserInterfaceServerState).brand = brand.concept.name;
  return unified;
};

const userInterfaceServerConcept = (goal: commandLineInterfaceGoals, brand?: {
  concept: Concept,
}): Concept =>  {
  if (brand) {
    return unifyBrandConcept(goal, brand);
  }
  return baseUserInterfaceServerConcept(goal, [helloWorldPageStrategy]);
};

export const createUserInterfaceServerConcept = (goal: commandLineInterfaceGoals, brand?: {
  concept: Concept,
}, port?: number) => {
  const serverConcept = createServerConcept(port);
  const unified = unifyConcepts([createWebSocketServerConcept(), serverConcept], userInterfaceServerConcept(goal, brand));
  return unified;
};
