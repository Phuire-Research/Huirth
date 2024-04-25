/*<$
For the graph programming framework Stratimux and a Concept logixUX, generate a User Interface Component quality to create the style component necessary for the logixUX page strategies.
$>*/
/*<#*/
import {
  createMethod,
  nullReducer,
  strategySuccess
} from 'stratimux';

import { createQualitySetComponent, selectComponentPayload, userInterface_appendCompositionToPage } from '../../../../model/userInterface';

export const [
  logixUXStyle,
  logixUXStyleType,
  logixUXStyleQuality
] = createQualitySetComponent({
  type: 'Create logixUX Style',
  reducer: nullReducer,
  componentCreator: (act) => createMethod(
    (action) => {
      const payload = selectComponentPayload(action);
      if (action.strategy) {
        return strategySuccess(action.strategy, userInterface_appendCompositionToPage( action.strategy, {
          id: '',
          boundSelectors: [],
          universal: true,
          action: act(payload),
          html: /*html*/`
  <style>
    html, body {
      overflow-x: clip;
    }
    .center {
      margin: 0 auto;
      padding-top: 5%;
      padding-bottom: 5%;
      width: 768px;
    }
    .center-m {
      margin: 0 auto;
    }
    .center-image {
      margin: 0 auto;
      width: 30%;
    }
    .header {
      padding-top: 10px;
      font-size: 24px;
    }
    .title {
      padding-top: 10px;
      font-size: 20px;
    }
    @media only screen and (min-width: 640px) {
        
    } 
    @media only screen and (min-width: 768px) {
        
    } 
    @media only screen and (min-width: 1024px) {
        
    } 
    @media only screen and (min-width: 1280px) {
        
    } 
    @media only screen and (min-width: 1536px) {
        
    } 
    @media only screen and (min-width: 2000px) {
      
    }
    .carbon-fiber {
      background-image: repeating-linear-gradient(135deg, transparent, transparent 10px, #0f0f0f 10px, #111 20px);
      background-color: #000000;
    }
  </style>
    `
        }));
      }
      return action;
    }
  )
});
/*#>*/