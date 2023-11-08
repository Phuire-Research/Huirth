import {
  Action,
  Concepts,
  PrincipleFunction,
  UnifiedSubject,
  areConceptsLoaded,
  axiumRegisterStagePlanner,
  axiumSelectOpen,
  primeAction,
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
import { userInterfaceServerPrepareContextConceptsStrategy } from './strategies/prepareContextConcepts.strategy';
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
  const plan = concepts$.stage('User Interface Context Principle Plan', [
    (concepts, dispatch) => {
      const fileSystemExists = areConceptsLoaded(concepts, [fileSystemName]);
      if (!fileSystemExists) {
        console.log('FILE SYSTEM NOT LOADED, CONTEXT PRINCIPLE CONCLUDE');
        plan.conclude();
      } else {
        dispatch(primeAction(concepts, axiumRegisterStagePlanner({conceptName: userInterfaceServerName, stagePlanner: plan})), {
          iterateStage: true,
          on: {
            selector: axiumSelectOpen,
            expected: true
          },
        });
      }
    },
    (concepts, dispatch) => {
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (fileSystemState) {
        dispatch(strategyBegin(userInterfaceServerSetConceptDirectoriesFromDataStrategy(fileSystemState.root)), {
          iterateStage: true
        });
      }
    },
    (concepts, dispatch) => {
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
            if (Object.keys(finalBindingsList).length > 0) {
              conceptsAndProps.push({
                name: documentObjectModelName,
                properties: [userInterface_pageBindingsToString(finalBindingsList)],
              });
              conceptsAndProps.push({
                name: userInterfaceClientName,
              });
            }
            console.log('CHECK GOAL', uiState.goal);
            if (uiState.goal === commandLineInterfaceGoals.dynamicDeployment) {
              const [____, contextStrategy] = userInterfaceServerPrepareContextConceptsStrategy(
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
    },
    (__, dispatch) => {
      // console.log('HIT FOR OLD TIMES SAKE');
      plan.conclude();
    },
  ]);
};
