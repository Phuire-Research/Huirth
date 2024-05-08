/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a principle that will bind the current page's preloaded document bindings.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  axiumKick,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  createStage,
  primeAction,
  selectSlice,
  selectState,
  selectUnifiedState,
  strategyBegin,
} from 'stratimux';
import { Subscriber } from 'rxjs';
import { DocumentObjectModelState, documentObjectModelName } from './documentObjectModel.concept';
import { documentObjectModelBindingStrategy } from './strategies/composeBindings.strategy';
import { documentObjectModelSelectBindingQue } from './documentObjectModel.selector';

export const documentObjectModelPrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  _concepts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const pageID = document.querySelector('[id^="page#"]')?.id;
  const plan = concepts$.plan('Document Object Model initial page bindings plan', [
    createStage(
      (concepts, dispatch) => {
        if (selectSlice(concepts, axiumSelectOpen) === true) {
          dispatch(primeAction(concepts, axiumRegisterStagePlanner({ conceptName: documentObjectModelName, stagePlanner: plan })), {
            iterateStage: true,
          });
        }
      },
      { priority: 100 }
    ),
    createStage(
      (concepts, dispatch) => {
        const documentObjectModelState = selectUnifiedState<DocumentObjectModelState>(concepts, semaphore);
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
          plan.conclude();
        }
      },
      { beat: 100 }
    ),
    createStage((__, ___) => {
      plan.conclude();
    }),
  ]);
};
/*#>*/
