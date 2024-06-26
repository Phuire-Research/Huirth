/*<$
For the graph programming framework Stratimux and the User Interface Server Concept,
generate a principle that will manager a generated context based upon the the configuration of the server. This context will be treated as the client run time.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  areConceptsLoaded,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  createStage,
  getAxiumState,
  primeAction,
  selectSlice,
  selectState,
  selectUnifiedState,
  strategyBegin
} from 'stratimux';
import { Subscriber } from 'rxjs';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import { UserInterfaceServerState, userInterfaceServerName } from './userInterfaceServer.concept';
import {
  ConceptAndProperties,
  UserInterfaceBindings,
  UserInterfacePageBindings,
  userInterface_pageBindingsToString
} from '../../model/userInterface';
import { userInterfaceServerPrepareContextConceptsStitch } from './strategies/prepareContextConcepts.strategy';
import { userInterfaceServerSetConceptDirectoriesFromDataStrategy } from './strategies/setConceptDirectories.strategy';
import { documentObjectModelName } from '../documentObjectModel/documentObjectModel.concept';
import { commandLineInterfaceGoals } from '../../model/commandLineInterface';
import { userInterfaceServerPrepareStaticConceptsStrategy } from './strategies/prepareStaticConcepts.strategy';
import { userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';

export const userInterfaceServerContextPrinciple: PrincipleFunction = (
  _: Subscriber<Action>,
  _concepts: Concepts,
  concepts$: UnifiedSubject,
  semaphore: number
) => {
  const plan = concepts$.plan('User Interface Context Principle Plan', [
    createStage((concepts, dispatch, changes) => {
      console.log('CHECK IF THIS HITS', selectSlice(concepts, axiumSelectOpen), getAxiumState(concepts).modeIndex, axiumSelectOpen.keys, changes , 'stuff');
      if (selectSlice(concepts, axiumSelectOpen) === true) {
        const fileSystemExists = areConceptsLoaded(concepts, [fileSystemName]);
        if (!fileSystemExists) {
          console.log('FILE SYSTEM NOT LOADED, CONTEXT PRINCIPLE CONCLUDE');
          plan.conclude();
        } else {
          dispatch(primeAction(concepts, axiumRegisterStagePlanner({conceptName: userInterfaceServerName, stagePlanner: plan})), {
            iterateStage: true,
          });
        }
      }
    }, { selectors: [axiumSelectOpen] }),
    createStage((concepts, dispatch) => {
      console.log('CHECK IF THIS HITS 2');
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (fileSystemState) {
        dispatch(strategyBegin(userInterfaceServerSetConceptDirectoriesFromDataStrategy(fileSystemState.root)), {
          iterateStage: true
        });
      }
    }),
    createStage((concepts, dispatch) => {
      console.log('CHECK IF THIS HITS 3');
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      const uiState = selectUnifiedState<UserInterfaceServerState>(concepts, semaphore);
      if (fileSystemState && uiState) {
        if (fileSystemState.conceptDirectoryMap.length > 0 && uiState.pageStrategies.length > 0) {
          if (uiState.pageStrategies.length === uiState.pages.length) {
            const conceptsAndProps: ConceptAndProperties[] = [];
            const finalBindingsList: UserInterfacePageBindings = {};
            for (const page of uiState.pages) {
              page.conceptAndProps.forEach(conceptAndProp => {
                let exists = false;
                conceptsAndProps.forEach(cap => {
                  if (cap.name === conceptAndProp.name) {
                    exists = true;
                  }
                });
                if (!exists) {
                  conceptsAndProps.push({
                    name: conceptAndProp.name,
                    properties: conceptAndProp.properties
                  });
                }
                if (uiState.brand) {
                  let bindingsList: UserInterfaceBindings = {};
                  for (const comp of page.compositions) {
                    if (comp.bindings) {
                      bindingsList = {
                        ...bindingsList,
                        ...comp.bindings
                      };
                    }
                  }
                  finalBindingsList[page.title] = bindingsList;
                }
              });
            }
            conceptsAndProps.push({
              name: documentObjectModelName,
              properties: [userInterface_pageBindingsToString(finalBindingsList)],
            });
            if (uiState.brand) {
              conceptsAndProps.push({
                name: userInterfaceClientName,
                properties: ['state', uiState.brand]
              });
            } else {
              conceptsAndProps.push({
                name: userInterfaceClientName,
                properties: ['state']
              });
            }
            if (uiState.goal === commandLineInterfaceGoals.dynamicDeployment) {
              console.log('CHECK IF THIS HITS');
              const [____, contextStrategy] = userInterfaceServerPrepareContextConceptsStitch(
                fileSystemState.root,
                conceptsAndProps,
                concepts[semaphore].unified,
                fileSystemState.conceptDirectoryMap
              );
              dispatch(strategyBegin(contextStrategy), {
                iterateStage: true
              });
            } else {
              const contextStrategy = userInterfaceServerPrepareStaticConceptsStrategy(
                fileSystemState.root,
                conceptsAndProps,
                concepts[semaphore].unified,
                fileSystemState.conceptDirectoryMap,
                uiState.pages
              );
              dispatch(strategyBegin(contextStrategy), {
                iterateStage: true
              });
            }
          }
        }
      }
    }),
    createStage(() => {
      plan.conclude();
    }),
  ]);
};
/*#>*/