/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a principle that will bind the current page's preloaded document bindings.
$>*/
/*<#*/
import { muxiumSelectOpen, selectSlice, selectState, strategyBegin } from 'stratimux';
import { DocumentObjectModelPrinciple, DocumentObjectModelState, documentObjectModelName } from './documentObjectModel.concept';
import { documentObjectModelBindingStrategy } from './strategies/composeBindings.strategy';

export const documentObjectModelPrinciple: DocumentObjectModelPrinciple = ({ plan }) => {
  const pageID = document.querySelector('[id^="page#"]')?.id;
  plan('Document Object Model initial page bindings plan', ({ stage }) => [
    stage(
      ({ concepts, dispatch, stagePlanner, d }) => {
        if (selectSlice(concepts, d.muxium.k.open) === true) {
          dispatch(d.muxium.e.muxiumRegisterStagePlanner({ conceptName: documentObjectModelName, stagePlanner }), {
            iterateStage: true,
          });
        }
      },
      { priority: 100 }
    ),
    stage(
      ({ concepts, dispatch, stagePlanner, k }) => {
        const documentObjectModelState = k.state(concepts);
        const userInterfaceState = selectState<any>(concepts, 'userInterfaceClient');
        // console.log('Hello Document Object Model', documentObjectModelState, pageID, concepts);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (documentObjectModelState?.bindingQue) {
          let ready = false;
          // userInterfaceState?.pages.forEach((page: {title: string}) => {
          //   pageID && page.title === pageID ? ready = true : ready = false;
          // });
          for (const page of userInterfaceState.pages) {
            if (pageID && page.title === pageID) {
              ready = true;
              break;
            }
          }
          const binding = documentObjectModelState?.bindingQue;
          // console.log('Hello Document Object Model', binding, pageID, ready);
          if (binding && pageID && ready) {
            dispatch(strategyBegin(documentObjectModelBindingStrategy(concepts, pageID.split('page#')[1], binding)), {
              iterateStage: true,
            });
          }
        }
        if (documentObjectModelState?.bound) {
          stagePlanner.conclude();
        }
      },
      { beat: 100 }
    ),
    stage(({ stagePlanner }) => {
      stagePlanner.conclude();
    }),
  ]);
};
/*#>*/
