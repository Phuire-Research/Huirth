import {
  Action,
  ActionStrategy,
  ActionStrategyStitch,
  Concepts,
  KeyedSelector,
  getUnifiedName,
  selectPayload,
  strategyData_select
} from 'stratimux';
import { elementEventBinding } from './html';
import { documentObjectModelName } from '../concepts/documentObjectModel/documentObjectModel.concept';

/**
 * Should be ID as #string
 */
export type ElementIdentifier = string;

// This is going to use DOM Strategies that bind the Event and creates an Action Node of ActionType to pass that Event TO
export type Binding = {
  action: Action;
  eventBinding: elementEventBinding | string;
}
export type UserInterfaceBindings = Record<ElementIdentifier, Binding[]>;
export type UserInterfacePageBindings = Record<string, UserInterfaceBindings>;
export type PageStrategyCreators = (concepts?: Concepts, semaphore?: number) => ActionStrategyStitch;

export type BrandState = {
  pageStrategies: PageStrategyCreators[]
};

export const createPageId = (pageName: string) => {
  return `page#${pageName}`;
};

export const createBinding =
  (bindings: {elementId: string, eventBinding: elementEventBinding, action: Action}[]): UserInterfaceBindings => {
    const binding: UserInterfaceBindings = {};
    bindings.forEach(bind => {
      binding[bind.elementId] = [{action: bind.action, eventBinding: bind.eventBinding}];
    });
    return binding;
  };

export const userInterface_selectInputTarget = (action: Action) => {
  const payload = selectPayload<Event>(action);
  return payload.target as HTMLInputElement;
};

export const userInterface_isClient = (concepts: Concepts, semaphore: number) => {
  const name = getUnifiedName(concepts, semaphore);
  if (name) {
    return name === 'userInterfaceClient';
  } else {
    return undefined;
  }
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
      output +=
        `\t{\n\t\taction: ${JSON.stringify(b.action).replace(/"/g,'\'')},\n\t\teventBinding: '${b.eventBinding}'\n\t},`;
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
  id: string
  action: Action,
  selectors: KeyedSelector[],
  semaphore: [number, number],
}

export const createBoundSelectors =
  (id: string, action: Action, selectors: KeyedSelector[]): BoundSelectors => ({id, action, selectors, semaphore: [-1, -1]});

export type Composition = {
  id: string;
  boundSelectors: BoundSelectors[],
  bindings?: UserInterfaceBindings,
  html: string,
  action: Action;
}

export type Page = {
  title: string,
  conceptAndProps: ConceptAndProperties[],
  compositions: Composition[]
  cachedSelectors: BoundSelectors[]
}

export type PrimedConceptAndProperties = {
  name: string,
  nameCapitalized: string,
  properties?: string[]
}
export type ConceptAndProperties = {
  name: string,
  properties?: string[]
}

export const userInterface_createPage = (page?: Page): Page => (
  page ? page : {
    title: '',
    conceptAndProps: [],
    compositions: [],
    cachedSelectors: [],
  });

export const userInterface_appendCompositionToPage =
  (strategy: ActionStrategy, composition: Composition): Page => {
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
      page.conceptAndProps[index].properties = [
        ...(page.conceptAndProps[index].properties as string[]),
        ...newProps,
      ];
    } else {
      page.conceptAndProps.push({
        name: documentObjectModelName,
        properties: newProps
      });
    }
    return page;
  } else {
    const page = userInterface_createPage();
    page.conceptAndProps.push({
      name: documentObjectModelName,
      properties: newProps
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
