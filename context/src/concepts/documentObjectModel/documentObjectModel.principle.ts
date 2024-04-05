/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a principle that will bind the current page's preloaded document bindings.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
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
        if (selectSlice(concepts, axiumSelectOpen)) {
          dispatch(primeAction(concepts, axiumRegisterStagePlanner({ conceptName: documentObjectModelName, stagePlanner: plan })), {
            iterateStage: true,
          });
        }
      },
      { priority: 1, selectors: [axiumSelectOpen] }
    ),
    createStage(
      (concepts, dispatch) => {
        // console.log('Hello Document Object Model', selectUnifiedState<DocumentObjectModelState>(concepts, semaphore)?.bindingQue);
        const documentObjectModelState = selectUnifiedState<DocumentObjectModelState>(concepts, semaphore);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userInterfaceState = selectState<any>(concepts, 'userInterfaceClient');
        let ready = false;
        userInterfaceState?.pages.forEach((page: { title: string }) => {
          pageID && page.title === pageID ? (ready = true) : (ready = false);
        });
        const binding = documentObjectModelState?.bindingQue;
        if (binding && pageID && ready) {
          dispatch(strategyBegin(documentObjectModelBindingStrategy(concepts, pageID.split('page#')[1], binding)), {
            iterateStage: true,
          });
        }
      },
      { selectors: [documentObjectModelSelectBindingQue] }
    ),
    createStage((__, ___) => {
      plan.conclude();
      // console.log('Plan can conclude.');
    }),
  ]);
};
/*#>*/
