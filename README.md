![logixUX](https://github.com/Phuire-Research/logixUX/blob/main/LogixUX.png?raw=true)
# Stratimux Sidekick
This application is meant to be the equivalent to any other framework's CLI system. The goal is to provide an easy means of quickly scaffolding Stratimux projects. As well as utilizing fine-tuned models to quickly generate potential implementations. While having the user reinforce those implementations with a version that is provably halting. This approach allows for a safe recursive improvement of the fine tuned intelligence that we utilize within this bleeding edge system of design.

We intend to accomplish this via any scaffolded or generated qualities made for your applications by this sidekick and potential future variations. To have that prompt be set as a comment that can later be parsed into a shared dataset.

What this system demonstrates even in its rough form. Is a system of design that is not only provably terminating as a recursive function, but still able to perform all turing complete operations. Thus this system demonstrates a interactive experience that solves the halting problem of the classic turing machine. If you do something well, no one notices a thing, it just works and that is the curse of well reasoned logic.

## Digital Embodiment of AI
The purpose of this project is to build in public a proof of concept of three parts. 
1. [Stratimux](https://github.com/Phuire-Research/Stratimux/) - In its capacity to perform as a universal transformer.
2. A working example of a prototype "User Interface Concept."
3. A method of safe recursive improvement of AI via Stratimux as a surrogate ABI (Autonomous Baseline Intelligence), written in plain text.

The greatest benefit to this approach. Is that by way of creating purposely crafted training data based on a graph network of quality relations. We are in effect creating hand written version of artificial intelligence that we would want to bring into existence. Thus, there is a point of departure within this design system, and that is when we move beyond fine tuning. And purely utilize the training data we purposefully create, to train a truly transparent and open source artificial intelligence. Where this intelligence would not be a chatbot, but instead embody and generate whatever interface we have design alongside it. Whether that be a cli, website, game... Completely safe, because we can logically determine what goes into that training data and vet all its parts to be safe. 

In the now, this is a critical junction between hyper reliance upon black boxes(something you cannot understand the inner workings of) and the downplay of merited creation. Thus, what this system proposes, is understanding of all that parts that black box unlimited pleasure button of generative AI. This system provides a method of merit, by way of understanding all that parts that our systems would come to rely upon. As everything written and submitted as training data would just be plain text in the spirit of the open internet.

It is also important to note that Stratimux and logixUX have been handwritten projects to this point, with no use of generative AI. Beyond this commit and the fine tuning of an AI using this system. I'll be finally breaking that limitation I placed upon myself in the creation of this system. As a way to enjoy the last bits of bashing my head into a wall, with only myself to blame.

Be safe and responsible. But most importantly, have fun!

**GOAL: Reduce complexity of working with this pattern via generative AI in combination with a custom UI**

![Stratimux](https://github.com/Phuire-Research/Stratimux/blob/main/Stratimux.png?raw=true)
# ADVANCED STRATIMUX TEMPLATE
```bash
npm i
```
*Note if tsconfig.json is giving a type error for jest, be sure to open jest config after your **npm i***

For more examples: [https://github.com/Phuire-Research/Stratimux/tree/main/src/concepts](https://github.com/Phuire-Research/Stratimux/tree/main/src/concepts)

*Reminder:* This is a research project and while in a appropriate beta state. Some of aspects are bound to change, especially with the addition of more helper functions.
### Project Structure
```
src/ index.ts
src/ concepts / uX / qualities / qOfUX.quality.ts
     concepts / uX / strategies / sOfUX.strategy.ts
     concepts / uX / uX.concept.ts
     concepts / uX / uX.principle.ts
     tests / uX.test.ts
```

### uX.concept.ts
```typescript
import { Action, Mode, Quality, createConcept, PrincipleFunction } from 'stratimux';
import { uXqOfUXQuality } from './qualities/qOfUx.quality'
import { uXPrinciple } from './uX.principle'

export type UXState = {
  //
}

export const uXName = 'uX';

export const createUXState = (): ExperimentState => {
  return {
    //
  };
};

// Pass any arguments needed for your concept
export const createUXConcept = (
//  state: Record<string, unknown>,
//  qualities?: Quality[],
//  principles?: PrincipleFunction[],
//  mode?: Mode[]
) => {
  return createConcept(
    uXName,
    createUXState(),
    [
      uXqOfUXQuality
    ],
    [

      uXPrinciple,
    ],
    mode
  );
};
```



```typescript
import { MethodCreator, Action, prepareActionCreator, createQuality, UnifiedSubject, createMethodWithState, strategySuccess } from '../../../model/concept';

export type uXqOfUXType = 'uX allows for easy selection of your qualities, qOfUX is your quality, and Type is the distinction';
export const uXqOfUX = prepareActionCreator(uXqOfUXType);

const qOfUXCreator: MethodCreator = (concepts$?: UnifiedSubject, semaphore?: number) =>
  // Only if you need to access state, otherwise
  createMethodWithState<ExperimentState>((action, state) => {
    if (action.strategy) {
      const strategy = strategySuccess(action.strategy);
      return strategy;
    }
    return action;
  }, concepts$ as UnifiedSubject, semaphore as number);

function qOfUXReducer(state: ExperimentState, _: Action): ExperimentState {
  return {
    ...state,
  };
}

export const uXqOfUXQuality = createQuality(
  qOfUXType,
  qOfUXReducer,
  qOfUXCreator
);
/* Below are the default functions available for your quality */
// export const qOfUXQuality = createQuality(
//   qOfUXType,
//   defaultReducer,
//   defaultMethodCreator
// );
```

```typescript
import { ActionStrategy, ActionStrategyParameters, createActionNode, createStrategy } from 'stratimux';
import { axiumLog, axiumKick } from 'stratimux';
import { uXqOfUX } from '../qualities/qOfUX.quality';

export const uXsOfUXTopic = 'uX is your concept for ease of selection via autofill, sOfUX is your strategy\'s name, and the topic is a method of identification of your strategy.';
export function uXsOfUX(): ActionStrategy {
  const stepTwo = createActionNode(axiumKick(), {
    successNode: stepThree,
    failureNode: null,
  });
  const stepTwo = createActionNode(axiumLog(), {
    successNode: stepThree,
    failureNode: null,
  });
  const stepOne = createActionNode(uXqOfUX(), {
    successNode: stepTwo,
    failureNode: null,
  });

  const params: ActionStrategyParameters = {
    topic: uXsOfUXTopic,
    initialNode: stepOne,
  };

  return createStrategy(params);
}
```

### uX.principle.ts
Your concept's "main" function. This will be called after the axium initializes. 
* observer - Using observer.next(someAction) will directly emit that action into the axium's action stream.
* _concepts - Is the initial load of concepts when your principle is initialized
* concepts$- Is the UnifiedSubject that controls the halting quality of Stratimux and informs principles, methods, and any general subscriber of state changes.
* semaphore - This identifies the placement of your concept in the axium's conceptual set. This is used to determine if your concept is loaded and access state via the selectUnifiedState function.

```typescript
import { Subscriber } from 'rxjs';
import { Action, Concepts, PrincipleFunction, UnifiedSubject, registerPrincipleSubscription, selectUnifiedState } from '../../model/concept';
import { UXSTATE, uXName } from './uX.concept';

export const uXPrinciple: PrincipleFunction = (
  observer: Subscriber<Action>,
  _concepts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const plan = concepts$.stage('uX Plan', [
    (concepts, dispatch) => {
      // This will register this plan to the axium, this allows for the axium to close or remove your concept cleanly.
      dispatch(primeAction(concepts, axiumRegisterStagePlanner({conceptName: uXName, stagePlanner: plan})), {
        on: {
          selector: axiumSelectOpen,
          expected: true,
        },
        iterateStage: true
      });
    },
    (concepts, dispatch) => {
      const state = selectUnifiedState(concepts, semaphore);
      if (state) {
        //
      }
    }
  ]);
};

```

### index.ts
```typescript
import { createAxium } from 'stratimux';
import { createUXConcept } from './concepts/uX/uX.concept'

(() => {
  const axiumName = '';
  // Sets logging to true and store dialog to true
  //  This will log to the console the dialog of each successive ActionStrategy
  //  And store the entire application context in the axium's dialog.
  createAxium(axiumName, [createUXConcept()], true, true);
})();
```