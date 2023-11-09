import { documentObjectModelName } from '../concepts/documentObjectModel/documentObjectModel.concept';
import { PrimedConceptAndProperties } from './userInterface';

export async function createContextIndexContent(primedConcepts: PrimedConceptAndProperties[], directoryMap: string[]): Promise<string> {
  const creators = await createConceptCreatorTemplates(primedConcepts);
  const imports = await createConceptImportTemplates(primedConcepts);
  const content =
    /*typescript*/
    `/*$ Start template imports $*/
import { createAxium } from 'stratimux';
${imports}
/*$ End template imports $*/

(() => {
  /*$ Start context template code $*/
  const axium = createAxium('contextAxium', [
    ${creators}
  ]);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  console.log('AXIUM INIT');
  /*$ End context template code $*/
})();
`;
  return content;
}

async function createConceptImportTemplates(concepts: PrimedConceptAndProperties[]): Promise<string> {
  return concepts.map((concept) => createConceptImport(concept)).join('\n');
}

function createConceptImport(concept: PrimedConceptAndProperties): string {
  return `import { create${concept.nameCapitalized}Concept } from './concepts/${concept.name}/${concept.name}.concept';`;
}

async function createConceptCreatorTemplates(concepts: PrimedConceptAndProperties[]): Promise<string> {
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
