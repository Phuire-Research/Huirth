/*<$
For the graph programming framework Stratimux and the logixUX Project, generate a model that would enable all functionality required for the User Interface base concept.
$>*/
/*<#*/
import {
  Action,
  ActionNode,
  ActionStrategy,
  ActionStrategyStitch,
  ActionType,
  Concepts,
  KeyedSelector,
  createAction,
  createActionNode,
  selectPayload,
  strategyData_select,
} from 'stratimux';
import { elementEventBinding } from './html';
import { documentObjectModelName } from '../concepts/documentObjectModel/documentObjectModel.concept';
import { userInterfaceNext } from '../concepts/userInterface/qualities/next.quality';

/**
 * Should be ID as #string
 */
export type ElementIdentifier = string;

// This is going to use DOM Strategies that bind the Event and creates an Action Node of ActionType to pass that Event TO
export type Binding = {
  action: Action;
  eventBinding: elementEventBinding | string;
};
export type UserInterfaceBindings = Record<ElementIdentifier, Binding[]>;
export type UserInterfacePageBindings = Record<string, UserInterfaceBindings>;
export type PageStrategyCreators = (concepts?: Concepts, semaphore?: number) => ActionStrategyStitch;
export type ActionStrategyComponentStitch = (payload: ActionComponentPayload) => [ActionNode, ActionStrategy];

export type BrandState = {
  pageStrategies: PageStrategyCreators[];
};

export const createPageId = (pageName: string) => {
  return `page#${pageName}`;
};

export type PreBind = {
  elementId: string;
  eventBinding: elementEventBinding;
  action: Action;
};

export const createBinding = (bindings: PreBind[]): UserInterfaceBindings => {
  const binding: UserInterfaceBindings = {};
  bindings.forEach((bind) => {
    const possible = binding[bind.elementId];
    if (possible !== undefined) {
      binding[bind.elementId] = [...possible, { action: bind.action, eventBinding: bind.eventBinding }];
    } else {
      binding[bind.elementId] = [{ action: bind.action, eventBinding: bind.eventBinding }];
    }
  });
  return binding;
};

type ActionEventPayload = {
  event: Event;
};

export const userInterface_selectInputTarget = (action: Action) => {
  const payload = selectPayload<ActionEventPayload>(action).event;
  return payload.target as HTMLInputElement;
};

export const userInterface_isClient = (): boolean => {
  return typeof window !== 'undefined';
};

export const userInterface_pageBindingsToString = (pageBindings: UserInterfacePageBindings): string => {
  let output = '{ ';
  const bindingsKeys = Object.keys(pageBindings);
  for (const key of bindingsKeys) {
    output += `'${key}' : ${userInterface_bindingsToString(pageBindings[key])}`;
    output += ',\n';
  }
  output += '\n}';
  return output;
};

const userInterface_bindingsToString = (bindings: UserInterfaceBindings): string => {
  let output = '{ ';
  const bindingsKeys = Object.keys(bindings);
  for (const key of bindingsKeys) {
    output += `'${key}' : [\n`;
    const bind = bindings[key];
    for (const b of bind) {
      output += `\t{\n\t\taction: ${JSON.stringify(b.action).replace(/"/g, "'")},\n\t\teventBinding: '${b.eventBinding}'\n\t},`;
    }
    output += '\n],';
  }
  output += '\n}';
  return output;
};

export type UserInterfacePageStrategies = Record<string, PageStrategyCreators>;

/**
 * @param selector `optional` Creates a subscription that will dispatch the Action on value change
 * @param bindings `optional` Binds the elementIdentifier to the DOM Event Binding Strategy calling action last in sequence.
 * If the event emits a value, that will be passed as a payload to that Action's Node.
 * @param html The html of your composition
 * @param action The action that creates your composition
 */

export type BoundSelectors = {
  id: string;
  action: Action;
  selectors: KeyedSelector[];
  semaphore: [number, number];
};

export const createBoundSelectors = (id: string, action: Action, selectors: KeyedSelector[]): BoundSelectors => ({
  id,
  action,
  selectors,
  semaphore: [-1, -1],
});

export type Composition = {
  id: string;
  universal: boolean;
  componentSemaphore?: number;
  boundSelectors: BoundSelectors[];
  bindings?: UserInterfaceBindings;
  html: string;
  action: Action;
};

export type Page = {
  title: string;
  conceptAndProps: ConceptAndProperties[];
  compositions: Composition[];
  cachedSelectors: BoundSelectors[];
  cachedComponentSelectors: BoundSelectors[];
};

export type PrimedConceptAndProperties = {
  name: string;
  nameCapitalized: string;
  properties?: string[];
};
export type ConceptAndProperties = {
  name: string;
  properties?: string[];
};

export const userInterface_createPage = (page?: Page): Page =>
  page
    ? page
    : {
        title: '',
        conceptAndProps: [],
        compositions: [],
        cachedSelectors: [],
        cachedComponentSelectors: [],
      };

export type ActionComponentPayload = {
  pageTitle: string;
};

export const selectComponentPayload = (action: Action) => selectPayload<ActionComponentPayload>(action);

export function prepareActionComponentCreator(actionType: ActionType) {
  return (
    payload: ActionComponentPayload,
    conceptSemaphore?: number,
    keyedSelectors?: KeyedSelector[],
    agreement?: number,
    semaphore?: [number, number, number, number]
  ) => {
    return createAction(actionType, payload, keyedSelectors, agreement, semaphore, conceptSemaphore);
  };
}

export const userInterface_appendCompositionToPage = (strategy: ActionStrategy, composition: Composition): Page => {
  const data = strategyData_select<Page>(strategy);
  if (data) {
    const page = data;
    page.compositions.push(composition);
    return page;
  } else {
    const newPage = userInterface_createPage();
    newPage.compositions.push(composition);
    return newPage;
  }
};

export const userInterface_appendBindings = (strategy: ActionStrategy, bindings: UserInterfaceBindings[]): Page => {
  const data = strategyData_select<Page>(strategy);
  const newProps: string[] = [];
  for (const bind of bindings) {
    newProps.push(userInterface_bindingsToString(bind));
  }
  if (data) {
    const page = data;
    const pageConcepts = page.conceptAndProps;
    let index = -1;
    for (let i = 0; i < pageConcepts.length; i++) {
      if (pageConcepts[i].name === documentObjectModelName) {
        index = i;
        break;
      }
    }
    if (page.conceptAndProps[index].properties && index !== -1) {
      page.conceptAndProps[index].properties = [...(page.conceptAndProps[index].properties as string[]), ...newProps];
    } else {
      page.conceptAndProps.push({
        name: documentObjectModelName,
        properties: newProps,
      });
    }
    return page;
  } else {
    const page = userInterface_createPage();
    page.conceptAndProps.push({
      name: documentObjectModelName,
      properties: newProps,
    });
    return userInterface_createPage();
  }
};

export const userInterface_selectPage = (strategy: ActionStrategy): Page => {
  const data = strategyData_select<Page>(strategy);
  if (data) {
    return data;
  } else {
    return userInterface_createPage();
  }
};

export const userInterface_createComponent = (action: Action, success?: ActionNode): ActionNode => {
  return createActionNode(action, {
    successNode: success ? success : null,
    failureNode: createActionNode(userInterfaceNext(), {
      successNode: null,
      failureNode: null,
    }),
  });
};

export const userInterface = {
  selectPage: userInterface_selectPage,
  appendCompositionToPage: userInterface_appendCompositionToPage,
  appendBindings: userInterface_appendBindings,
  bindingsToString: userInterface_bindingsToString,
  createPage: userInterface_createPage,
  createComponent: userInterface_createComponent,
  isClient: userInterface_isClient,
  pageBindingToString: userInterface_pageBindingsToString,
  selectInputTarget: userInterface_selectInputTarget,
};
/*#>*/
