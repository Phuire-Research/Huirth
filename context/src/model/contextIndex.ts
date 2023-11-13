import { counterName } from 'stratimux';
import { documentObjectModelName } from '../concepts/documentObjectModel/documentObjectModel.concept';
import { webSocketClientName } from '../concepts/webSocketClient/webSocketClient.concept';
import { PrimedConceptAndProperties } from './userInterface';

export function createContextIndexContent(primedConcepts: PrimedConceptAndProperties[], directoryMap: string[]): string {
  const axiumImports = ['createAxium'];
  const filteredPrimedConcepts = primedConcepts.filter((concept) => {
    for (const directory of directoryMap) {
      if (concept.name === webSocketClientName) {
        return false;
      } else if (directory === concept.name) {
        return true;
      }
    }
    axiumImports.push(`create${concept.nameCapitalized}Concept`);
    return false;
  });
  // HACKY FOR PROOF OF CONCEPTS, FIX THIS FLOW
  const creators = createConceptCreatorTemplates(
    primedConcepts.filter((concept) => concept.name !== webSocketClientName && concept.name !== counterName)
  );
  const imports = createConceptImportTemplates(filteredPrimedConcepts);
  const content =
    /*typescript*/
    `/*$ Start template imports $*/
import { ${axiumImports.join(', ')} } from 'stratimux';
${imports}
/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  let init = false;
  let state: Record<string, unknown> | undefined;
  fetch(window.location.protocol + '//' + window.location.host + '/stateSync').then(response => {
    response.json().then(value => {
      state = value;
      if (init && state) {
        createAxium('contextAxium', [
          ${creators}
        ], true, true);
      }
    });
  });
  document.onreadystatechange = () => {
    if (!init) {
      init = true;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  console.log('AXIUM INIT');
  /*$ End context template code $*/
})();
`;
  return content;
}

function createConceptImportTemplates(concepts: PrimedConceptAndProperties[]): string {
  return concepts.map((concept) => createConceptImport(concept)).join('\n');
}

function createConceptImport(concept: PrimedConceptAndProperties): string {
  return `import { create${concept.nameCapitalized}Concept } from './concepts/${concept.name}/${concept.name}.concept';`;
}

function createConceptCreatorTemplates(concepts: PrimedConceptAndProperties[]): string {
  return concepts
    .map((concept) => {
      return createConceptCreator(concept);
    })
    .join(',\n\t\t');
}

function createConceptCreator(concept: PrimedConceptAndProperties): string {
  if (concept.properties) {
    const props = concept.properties.join(', ');
    return `create${concept.nameCapitalized}Concept(${props})`;
  } else {
    return `create${concept.nameCapitalized}Concept()`;
  }
}
