import { Concept, Mode, PrincipleFunction, Quality, createConcept, forEachConcept } from 'stratimux';

function filterSimilarQualities(concept: Concept) {
  const newQualities: Quality[] = [];
  const newUnified: string[] = [];
  const newPrinciples: PrincipleFunction[] = [];
  const newMode: Mode[] = [];
  for (let i = 0; i < concept.qualities.length; i++) {
    let found = false;
    for (let j = i + 1; j < concept.qualities.length; j++) {
      if (concept.qualities[i].actionType === concept.qualities[j].actionType) {
        found = true;
        break;
      }
    }
    if (!found) {
      newQualities.push(concept.qualities[i]);
    }
  }
  concept.qualities = newQualities;
  for (let i = 0; i < concept.unified.length; i++) {
    let found = false;
    for (let j = i + 1; j < concept.unified.length; j++) {
      if (concept.unified[i] === concept.unified[j]) {
        found = true;
        break;
      }
    }
    if (!found) {
      newUnified.push(concept.unified[i]);
    }
  }
  concept.unified = newUnified;
  if (concept.principles) {
    for (let i = 0; i < concept.principles.length; i++) {
      let found = false;
      for (let j = i + 1; j < concept.principles.length; j++) {
        if (concept.principles[i].toString() === concept.principles[j].toString()) {
          found = true;
          break;
        }
      }
      if (!found) {
        newPrinciples.push(concept.principles[i]);
      }
    }
    concept.principles = newPrinciples;
  }
  if (concept.mode) {
    for (let i = 0; i < concept.mode.length; i++) {
      let found = false;
      for (let j = i + 1; j < concept.mode.length; j++) {
        if (concept.mode[i].toString() === concept.mode[j].toString()) {
          found = true;
          break;
        }
      }
      if (!found) {
        newMode.push(concept.mode[i]);
      }
    }
    concept.mode = newMode;
  }
  return concept;
}

function unify(base: Concept, target: Concept): Concept {
  base.unified.push(target.name);
  base.state = {
    ...base.state,
    ...target.state,
  };
  base.qualities = [...base.qualities, ...target.qualities];
  if (target.principles) {
    if (base.principles) {
      base.principles = [...base.principles, ...target.principles];
    } else {
      base.principles = [...target.principles];
    }
  }
  if (target.mode) {
    if (base.mode) {
      base.mode = [...base.mode, ...target.mode];
    } else {
      base.mode = [...target.mode];
    }
  }
  if (target.meta) {
    if (base.meta) {
      base.meta = {
        ...base.meta,
        ...target.meta,
      };
    } else {
      base.meta = {
        ...target.mode,
      };
    }
  }
  return base;
}
/**
 * Will document the usage of such after UI concept release.
 */
export function testUnifyConcepts(concepts: Concept[], emergentConcept: Concept): Concept {
  let newConcept = createConcept('', {});
  forEachConcept(concepts, (concept) => {
    // console.log('Before', concept);
    newConcept = unify(newConcept, concept);
    // console.log('After', concept);
  });
  newConcept = unify(newConcept, emergentConcept);
  newConcept.name = emergentConcept.name;
  // console.log('Final', newConcept);
  const filtered = filterSimilarQualities(newConcept);
  console.log('Filtered', filtered);
  return newConcept;
}
