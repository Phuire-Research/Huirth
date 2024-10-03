/*<$
For the graph programming framework Stratimux generate a User Interface Server Concept, that will unify itself with the User Interface and incoming Brand concept to be loaded on the server.
$>*/
/*<#*/
import { AnyConcept, MuxiumDeck, Concept, PrincipleFunction, Qualities, Quality, createConcept, muxifyConcepts } from '@phuire/stratimux';
import { createServerConcept } from '../server/server.concept';
import { userInterfaceServerOnChangePrinciple, userInterfaceServerPrinciple } from './userInterfaceServer.principle';
import { commandLineInterfaceGoals } from '../../model/commandLineInterface';
import { UserInterfaceState, createUserInterfaceConcept, userInterfaceQualities } from '../userInterface/userInterface.concept';
import { userInterfaceServerBuildContext } from './qualities/buildContext.quality';
import { userInterfaceServerContextPrinciple } from './userInterfaceServer.context.principle';
import { userInterfaceServerCreateEachPageHtml } from './qualities/createEachPageHtml.quality';
import { userInterfaceServerRecursivelyCreateEachPageHtml } from './qualities/recursivelyCreateEachPageHtml.quality';
import { userInterfaceServerCreateContextIndex } from './qualities/createContextIndex.quality';
import { helloWorldPageStrategy } from '../userInterface/strategies.ts/helloWorldPage.strategy';
import { userInterfaceServerFormatContext } from './qualities/formatContext.quality';
import { PageStrategyCreators } from '../../model/userInterface';
import { userInterfaceServerAssembleUpdateAtomicCompositionStrategy } from './qualities/serverAssembleUpdateAtomicCompositionStrategy.quality';
import { createWebSocketServerConcept } from '../webSocketServer/webSocketServer.concept';

// eslint-disable-next-line no-shadow
export enum workingConceptCategory {
  folder = 'folder',
  import = 'import',
}

export const userInterfaceServerName = 'userInterfaceServer';

export type UserInterfaceServerState = {
  createClientIndexQue: string[];
  brand?: string;
  goal: string;
} & UserInterfaceState;

export const createUserInterfaceServerState = (
  pageStrategies: PageStrategyCreators[],
  goal: commandLineInterfaceGoals
): UserInterfaceServerState => {
  return {
    pages: [],
    components: [],
    pageStrategies,
    pagesCached: false,
    createClientIndexQue: [],
    goal,
    boundSelectors: {},
    selectors: [],
  };
};

export type UserInterfaceServerPrinciple = PrincipleFunction<
  typeof userInterfaceQualities,
  MuxiumDeck & UserInterfaceServerDeck,
  UserInterfaceServerState
>;

const principleGoal = <Q>(goal: commandLineInterfaceGoals): PrincipleFunction<Q>[] => {
  let principles: UserInterfaceServerPrinciple[] = [];
  switch (goal) {
    case commandLineInterfaceGoals.simulate: {
      principles = [userInterfaceServerOnChangePrinciple];
      break;
    }
    case commandLineInterfaceGoals.none: {
      principles = [];
      break;
    }
    default: {
      principles = [userInterfaceServerContextPrinciple, userInterfaceServerOnChangePrinciple];
      break;
    }
  }
  return principles as unknown as PrincipleFunction<Q>[];
};

export const userInterfaceServerQualities = {
  userInterfaceServerCreateEachPageHtml,
  userInterfaceServerRecursivelyCreateEachPageHtml,
  userInterfaceServerCreateContextIndex,
  userInterfaceServerBuildContext,
  userInterfaceServerFormatContext,
  userInterfaceServerAssembleUpdateAtomicCompositionStrategy,
};

const qualityGoal = (goal: commandLineInterfaceGoals) => {
  switch (goal) {
    case commandLineInterfaceGoals.simulate: {
      return { userInterfaceServerAssembleUpdateAtomicCompositionStrategy };
    }
    default: {
      return userInterfaceServerQualities;
    }
  }
};

const baseUserInterfaceServerConcept = (goal: commandLineInterfaceGoals, pageStrategies: PageStrategyCreators[]) => {
  const qualities = { userInterfaceServerBuildContext, ...qualityGoal(goal) };
  return muxifyConcepts(
    [createUserInterfaceConcept([])],
    createConcept(userInterfaceServerName, createUserInterfaceServerState(pageStrategies, goal), qualities, [
      userInterfaceServerPrinciple,
      ...(principleGoal(goal) as unknown as UserInterfaceServerPrinciple[]),
    ])
  );
};

const unifyBrandConcept = (
  goal: commandLineInterfaceGoals,
  brand: {
    concept: AnyConcept;
  }
) => {
  const base = baseUserInterfaceServerConcept(goal, []);
  base.name = '';
  const unified = muxifyConcepts([base, brand.concept], createConcept(userInterfaceServerName, {}));
  (unified.state as UserInterfaceServerState).brand = brand.concept.name;
  return unified;
};

const userInterfaceServerConcept = (
  goal: commandLineInterfaceGoals,
  brand?: {
    concept: AnyConcept;
  }
) => {
  if (brand) {
    return unifyBrandConcept(goal, brand);
  }
  return baseUserInterfaceServerConcept(goal, [helloWorldPageStrategy]);
};

export type UserInterfaceServerDeck = {
  userInterfaceServer: Concept<UserInterfaceServerState, typeof userInterfaceQualities & typeof userInterfaceServerQualities>;
};

export const createUserInterfaceServerConcept = (
  goal: commandLineInterfaceGoals,
  brand?: {
    concept: AnyConcept;
  },
  port?: number
) => {
  const serverConcept = createServerConcept(port);
  const unified = muxifyConcepts([createWebSocketServerConcept(), serverConcept], userInterfaceServerConcept(goal, brand));
  return unified;
};
/*#>*/
