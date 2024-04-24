/*<$
For the graph programming framework Stratimux and Html Concept, generate a quality for a User Interface Concept that will add a html body element with the supplied page id.
$>*/
/*<#*/
import {
  createMethod,
  nullReducer,
  strategySuccess
} from 'stratimux';
import {
  createPageId,
  createQualitySetComponent,
  selectComponentPayload,
  userInterface_appendCompositionToPage
} from '../../../model/userInterface';

export const [
  htmlBodyBegin,
  htmlBodyBeginType,
  htmlBodyBeginQuality
] = createQualitySetComponent({
  type: 'Html create Body Begin',
  reducer: nullReducer,
  methodCreator: () => createMethod(
    (action) => {
      const payload = selectComponentPayload(action);
      if (action.strategy) {
        return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
          id: '',
          boundSelectors: [],
          universal: false,
          action: htmlBodyBegin(payload),
          html: /*html*/`
    <body id="${createPageId(payload.pageTitle)}">
      `
        }));
      }
      return action;
    }
  )
});
/*#>*/