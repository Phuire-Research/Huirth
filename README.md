![Huirth](https://github.com/Phuire-Research/huirth/blob/main/Huirth.png?raw=true)
# Huirth OS POC

## **NOTE** POC Notes
This will be patched up over the course of the month, majority of work has been focused on Stratimux and exploring how we might take full responsibility of the Operating System. The handy aspect of the ActionStrategy pattern, is that because it represents a baseline abstraction majority of the logic already written via the original huirth, may be translated to that new paradigm in the future. For now this has merely been a test project to ensure that Stratimux's updates does not break the underlying ActionStrategy pattern from 2018.

After the refactor however, this will serve as a form of backwards compatibility, while Huirth becomes increasingly responsible for its stack.

## Change Log
### Sync to v0.2.1 10/03/24
* Going to be stripping down this project for simplicity, just needed to ensure the baseline of the new version of Stratimux was up to snuff. This project is still heavily WIP.
### Sync to v0.1.72 5/21/2024
* Improved the internal consistency when handling the creation of pages for training data sets.
  * Still tracking down some odds and ends in regards to the handling of project statuses.
### Sync to v0.1.71
* Revamped the majority of logic and have a few timing issues to take care of in regards to state syncing and when pages are being updated.
  * Originally planned to use a new Buffer Method to have to skip over some extra logic, but found a new computation limit with Stratimux. The tests work fine side by side in isolation, but in a complex environment generally good enough computing jumps out of the bushes.
### Sync to v0.1.67
* Still essentially a drop in POC, need to iron out some logic.
* What is important is demoing the current consistency of Stratimux via the counter and dialog section on the index page.
  * Managed to reduce 50 debounce to just 3 and can probably go lower, if not remove it entirely.
* Managed to get the transformation quality plans to properly reach their conclusion via changing beat from 3 to 30.
  * This points a limitation in our current *generally good enough computers* that Stratimux pushes to some limit
    * In a **strong fast computation context** the beat for these plans could be removed entirely.
  * Last remaining issue on this point, is having the final returns of strategies moving between client and server to properly set their intended value.
    * *Update* Managed to have the strategies to save to file and render on client via the Data Manager, but the individual pages are currently not being created.
### Strong and Fast Update POC 5/06/24
* Roughly implemented v0.1.60, will have to tune and adjust some logic to account for performance increase.
### Rebranded to Huirth 3/01/24
### Sync to v0.1.55 and initial rebrand to Huirth 4/25/24 
### Sync to Stratimux v0.1.52 4/05/24
* Quick drop in replacement, need to strip down on change logix to include the incoming changes list provided as a planning feature.

## How to demo this project:
```bash
# In your console after cloning this repository
npm i
npm start
# A application window should load

# DEV - If you are brave and want to tweak the project
npm run dev:dynamic
## Note we can do this because we are only using electron as application bundler
## This will change once we add specific open directories, etc...
```
This application is meant to be the equivalent to any other framework's CLI system. The goal is to provide an easy means of quickly scaffolding Stratimux projects. As well as utilizing fine-tuned or long context capable models to quickly generate potential implementations. While having the user reinforce those implementations with a version that is provably halting. This approach allows for a safe recursive improvement of artificial intelligence that we utilize within this bleeding edge system of design.

We intend to accomplish this via any scaffolded or generated qualities made for your applications by this [FaaOS](https://dev.to/phuire/stratimux-is-a-function-as-operating-system-50ik) and potential future variations. To have that prompt be set as a comment that can later be parsed into a shared dataset.

What this system demonstrates even in its rough form. Is a system of design that is not only provably terminating as a recursive function, but still able to perform all turing complete operations. Thus this system demonstrates a interactive experience that solves the halting problem of the classic turing machine.

## Digital Embodiment of AI
The purpose of this project is to build in public a proof of concept of three parts. 
1. [Stratimux](https://github.com/Phuire-Research/Stratimux/) - In its capacity to perform as a universal transformer.
2. Huirth represents an POC of "User Interface Concept," and comparable Turing Complete application that can be pushed towards being a standalone operating system.
   1. Reminder Stratimux is a recursive provably terminating algorithm that still performs turing complete operations, this is supposed to be **impossible.** Turns out to be the basis of that judgement was an illogical assertion.
3. [PURF](https://github.com/Phuire-Research/Stratimux/) is a method of safe recursive improvement of AI via Stratimux as a Function as a Operating System [FaaOS](https://dev.to/phuire/stratimux-is-a-function-as-operating-system-50ik)

The greatest benefit to this approach. Is that by way of creating purposely crafted training data based on a graph network of quality relations. We are in effect creating hand written version of artificial intelligence that we would want to bring into existence. Thus, there is a point of departure within this design system, and that is when we move beyond fine tuning and feedback. Place larger emphasis on the training data we create, to train a truly transparent and open source artificial intelligence. Where this intelligence would not be a chatbot, but instead embody and generate whatever interface we have design alongside it. Whether that be a cli, website, game... Completely safe, because we can logically determine what goes into that training data and vet all its parts to be safe.

In the now, this is a critical junction between hyper reliance upon black boxes(something you cannot understand the inner workings of) and the downplay of merited creation. Thus, what this system proposes, is understanding of all that parts that black box unlimited pleasure button of generative AI represents. This system provides a method of merit, by way of understanding all that parts that our systems would come to rely upon. As everything written and submitted as training data would just be plain text in the spirit of the open internet.

It is also important to note that Stratimux and Huirth have been handwritten projects to this point, with no use of generative AI. After the current refactor based on lessons learned while creating the original logixUX prototype, we will begin focusing on embodiment and subsequently be finally breaking that limitation I placed upon myself in the creation of this system. This is simply a way to enjoy the last bits of bashing my head into a wall, with only myself to blame.

Be safe and responsible. But most importantly, have fun!

**GOAL Towards MVP: Reduce complexity of working with this pattern via generative AI in combination with a custom UI to quickly scaffold developer applications. And concept libraries.**

## Using huirth as a Universal Typescript Data Set Parser
These parsing tokens may be utilized within any TypeScript, not just Stratimux. And in the future may encompass any other programming paradigm. The data set parsing is designed to be able to extract out multiple prompts and contents from a single file. While allowing for addition annotation via the import and include section to provide a consistent training context for informing models or fine tuning preexisting models to work with your projects.
```typescript
export enum ParsingTokens {
// This will enclose a prompt you can assign to the content section.
  promptBegin = '/*<$',
  promptEnd = '$>*/',
// This allows for your code to still be used within your code base
  contentBegin = '/*<#*/',
  contentEnd = '/*#>*/',
// Only required when parsing multiple data sets from the same file. This allows you to group imports and content together without effecting code.
  importBegin = '/*<@',
  importEnd = '@>*/',
// Likewise if you are extracting multiple samples from a file, some samples may depend on each other, like a type or helper function being used across the file. This allows you to place that code into a commented section that will be grouped with the parsed sample.
  includeBegin = '/*<%',
  includeEnd = '%>*/',
// Allows you to exclude entire sections within your content from being added as a data set sample. While still operating within code.
  excludeBegin = '/*<!*/',
  excludeEnd = '/*!>*/',
// This will hard stop the parsing from adding any additional samples.
  stop = '/*<!!>*/'
}
```
If you would like to test out this system for yourself. For the time being simply annotate your public code repository with these parsing tokens. And within the Data Manager, import your project. Then once it has been installed. Simply hit parse then save your data set to your file system. All data sets are added into this project's data/sets/.
