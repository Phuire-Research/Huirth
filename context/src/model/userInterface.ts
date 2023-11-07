import { Action, ActionStrategy, ActionStrategyStitch, ActionType, Concepts, KeyedSelector, strategyData_select } from 'stratimux';
import { elementEventBinding } from './html';
import { documentObjectModelName } from '../concepts/documentObjectModel/documentObjectModel.concept';

/**
 * Should be ID as #string or className, but beware of array return.
 */
export type ElementIdentifier = string;
// Expand to include all variations of element bindings, onChange, onClick, etc...
/**
 * @WindowEvents
 * 'onafterprint' |'onbeforeprint' | 'onbeforeupload' | 'onerror' | 'onhashchange' | 'onload' | 'onmessage' |
 * 'onoffline' | 'ononline' | 'onpagehide' | 'onpageshow' | 'onpopstate' | 'onresize' | 'onunload' |
 * @FormEvents
 * 'onblur' | 'onchange' | 'oncontextmenu' | 'onfocus' | 'oninput' | 'oninvalid' | 'onreset' | 'onsearch' | 'onselect' | 'onsubmit' |
 * @KeyboardEvents
 * 'onkeydown' | 'onkeypress' | 'onkeyup' |
 * @MouseEvents
 * 'onclick' | 'ondblclick' | 'onmousedown' | 'onmouseout' | 'onmouseover' | 'onmouseup' | 'onwheel' |
 * @DragEvents
 * 'ondrag' | 'ondragend' | 'ondragenter' | 'ondragleave' | 'ondragover' | 'ondrop' | 'onscroll' |
 * @ClipboardEvents
 * 'oncopy' | 'oncut' | 'onpaste' |
 * @MediaEvents
 * 'onabort' | 'oncanplay' | 'oncanplaythrough' | 'oncuechange' | 'ondurationchange' | 'onemptied' | 'onended' | 'onerror' | 'onloadeddata'|
 * 'onloadedmetadata' | 'onloadstart' | 'onpause' | 'onplaying' | 'onprogress' | 'onratechange' | 'onseeked' | 'onseeking' | 'onstalled' |
 * 'onsuspend' | 'ontimeupdate' | 'onvolumechange' | 'onwaiting' |
 * @MiscEvents
 * 'ontoggle'
 */
// eslint-disable-next-line no-shadow

// This is going to use DOM Strategies that bind the Event and creates an Action Node of ActionType to pass that Event TO
export type Binding = {
  action: Action;
  eventBinding: elementEventBinding | string;
};
export type UserInterfaceBindings = Record<ElementIdentifier, Binding[]>;
export type UserInterfacePageBindings = Record<string, UserInterfaceBindings>;
export type PageStrategyCreators = (concepts?: Concepts, semaphore?: number) => ActionStrategyStitch;

export const createPageId = (pageName: string) => {
  return `page#${pageName}`;
};

export const createBinding = (
  bindings: { elementId: string; eventBinding: elementEventBinding; action: Action }[]
): UserInterfaceBindings => {
  const binding: UserInterfaceBindings = {};
  bindings.forEach((bind) => {
    binding[bind.elementId] = [{ action: bind.action, eventBinding: bind.eventBinding }];
  });
  return binding;
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
    output += '\n]';
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
export type Composition = {
  selectors: KeyedSelector[];
  bindings?: UserInterfaceBindings;
  html: string;
  action: Action;
};

export type Page = {
  title: string;
  conceptAndProps: ConceptAndProperties[];
  compositions: Composition[];
};

/**
 * @workingComposition
 * type Composition = {
 *  type: ActionType,
 *  selectorBindings: Map<elementIdentifier, binding>,
 *  cachedHtml: string,
 * }
 * @page
 * type Page = {
 *  title: string,
 *  conceptNames: string[]
 *  compositions: Composition[]
 * }
 */
// export type WorkingPageData = {
//   workingComposition: Composition,
//   page: Page,
// }

export type PrimedConceptAndProperties = {
  name: string;
  nameCapitalized: string;
  properties?: string[];
};
export type ConceptAndProperties = {
  name: string;
  properties?: string[];
};

// export const userInterface_createData = (workingComposition?: Composition, page?: Page): WorkingPageData => ({
//   workingComposition: workingComposition ? workingComposition : {
//     selectorBindings: new Map(),
//     cachedHtml: '',
//   },
//   page: page ? page : {
//     title: '',
//     conceptAndProps: [],
//     compositions: []
//   }
// });
export const userInterface_createPage = (page?: Page): Page =>
  page
    ? page
    : {
        title: '',
        conceptAndProps: [],
        compositions: [],
      };
// export const userInterface_setWorkingComposition =
//   (strategy: ActionStrategy, workingComposition: Composition): WorkingPageData => {
//     const data = strategyData_select<WorkingPageData>(strategy);
//     if (data) {
//       return {
//         ...data,
//         workingComposition
//       };
//     } else {
//       return userInterface_createData();
//     }
//   };
export const userInterface_appendCompositionToPage = (strategy: ActionStrategy, composition: Composition): Page => {
  const data = strategyData_select<Page>(strategy);
  if (data) {
    const page = data;
    page.compositions.push(composition);
    return page;
  } else {
    return userInterface_createPage();
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
// export const userInterface_appendComposition = (strategy: ActionStrategy, workingComposition: Composition): WorkingPageData => {
//   const data = strategyData_select<WorkingPageData>(strategy);
//   if (data) {
//     const page = data.page;
//     page.compositions.push(data.workingComposition);
//     return {
//       workingComposition: workingComposition ? workingComposition : {
//         selectorBindings: new Map(),
//         cachedHtml: '',
//       },
//       page,
//     };
//   } else {
//     return userInterface_createData();
//   }
// };

// export const userInterface_getSelectorBindings = (strategy: ActionStrategy): Map<string, binding> => {
//   let selectorBindings: Map<string, binding>;
//   const data = strategyData_select<WorkingPageData>(strategy)?.workingComposition.selectorBindings;
//   if (data) {
//     selectorBindings = data;
//   } else {
//     selectorBindings = new Map();
//   }
//   return selectorBindings;
// };
export const userInterface_selectPage = (strategy: ActionStrategy): Page => {
  const data = strategyData_select<Page>(strategy);
  if (data) {
    return data;
  } else {
    return userInterface_createPage();
  }
};

// export const compositionHtmlElementTop = (lang?: string): Composition => {
//   return {
//     selectorBindings: new Map(),
//     cachedHtml: /*html*/`
// <!DOCTYPE html>
// <html lang="${lang ? lang : 'en'}">
//   `
//   };
// };

// export const compositionHtmlElementBottom = (): Composition => {
//   return {
//     selectorBindings: new Map(),
//     cachedHtml: /*html*/`
// </html>
//   `
//   };
// };
