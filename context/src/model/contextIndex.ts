import { PrimedConceptAndProperties } from './userInterface';

export function createContextIndexContent(primedConcepts: PrimedConceptAndProperties[], directoryMap: string[]): string {
  const axiumImports = ['createAxium'];
  primedConcepts.forEach((concept) => {
    let found = false;
    for (const directory of directoryMap) {
      if (directory === concept.name) {
        found = true;
        break;
      }
    }
    if (!found) {
      axiumImports.push(`create${concept.nameCapitalized}Concept`);
    }
  });
  const creators = createConceptCreatorTemplates(primedConcepts);
  const imports = createConceptImportTemplates(primedConcepts);
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
