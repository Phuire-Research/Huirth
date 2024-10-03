/*<$
For the graph programming framework Stratimux and the User Interface Server Concept,
generate a principle that will manager a generated context based upon the the configuration of the server. This context will be treated as the client run time.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  PrincipleFunction,
  MuxifiedSubject,
  areConceptsLoaded,
  muxiumRegisterStagePlanner,
  muxiumSelectOpen,
  createStage,
  getMuxiumState,
  primeAction,
  selectSlice,
  selectState,
  selectMuxifiedState,
  strategyBegin,
  MuxiumQualities,
  MuxiumDeck,
} from '@phuire/stratimux';
import { Subscriber } from 'rxjs';
import { FileSystemState, fileSystemName } from '../fileSystem/fileSystem.concept';
import {
  UserInterfaceServerDeck,
  UserInterfaceServerState,
  userInterfaceServerQualities,
  userInterfaceServerName,
  UserInterfaceServerPrinciple,
} from './userInterfaceServer.concept';
import {
  ConceptAndProperties,
  UserInterfaceBindings,
  UserInterfacePageBindings,
  userInterface_pageBindingsToString,
} from '../../model/userInterface';
import { userInterfaceServerPrepareContextConceptsStitch } from './strategies/prepareContextConcepts.strategy';
import { userInterfaceServerSetConceptDirectoriesFromDataStrategy } from './strategies/setConceptDirectories.strategy';
import { documentObjectModelName } from '../documentObjectModel/documentObjectModel.concept';
import { commandLineInterfaceGoals } from '../../model/commandLineInterface';
import { userInterfaceServerPrepareStaticConceptsStrategy } from './strategies/prepareStaticConcepts.strategy';
import { userInterfaceClientName } from '../userInterfaceClient/userInterfaceClient.concept';

export const userInterfaceServerContextPrinciple: UserInterfaceServerPrinciple = ({ conceptSemaphore, plan }) => {
  plan('User Interface Context Principle Plan', ({ stage, d__ }) => [
    stage(
      ({ concepts, dispatch, changes, stagePlanner, d }) => {
        console.log(
          'CHECK IF THIS HITS',
          selectSlice(concepts, d.muxium.k.open),
          getMuxiumState(concepts).modeIndex,
          muxiumSelectOpen.keys,
          changes,
          'stuff'
        );
        if (selectSlice(concepts, d.muxium.k.open) === true) {
          const fileSystemExists = areConceptsLoaded(concepts, [fileSystemName]);
          if (!fileSystemExists) {
            console.log('FILE SYSTEM NOT LOADED, CONTEXT PRINCIPLE CONCLUDE');
            stagePlanner.conclude();
          } else {
            dispatch(primeAction(concepts, d.muxium.e.muxiumRegisterStagePlanner({ conceptName: userInterfaceServerName, stagePlanner })), {
              iterateStage: true,
            });
          }
        }
      },
      { selectors: [d__.muxium.k.open] }
    ),
    stage(({ concepts, dispatch, d }) => {
      console.log('CHECK IF THIS HITS 2');
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      if (fileSystemState) {
        dispatch(strategyBegin(userInterfaceServerSetConceptDirectoriesFromDataStrategy(fileSystemState.root, d)), {
          iterateStage: true,
        });
      }
    }),
    stage(({ concepts, dispatch, d, k }) => {
      console.log('CHECK IF THIS HITS 3');
      const fileSystemState = selectState<FileSystemState>(concepts, fileSystemName);
      const uiState = k.state(concepts);
      if (fileSystemState && uiState) {
        if (fileSystemState.conceptDirectoryMap.length > 0 && uiState.pageStrategies.length > 0) {
          if (uiState.pageStrategies.length === uiState.pages.length) {
            const conceptsAndProps: ConceptAndProperties[] = [];
            const finalBindingsList: UserInterfacePageBindings = {};
            for (const page of uiState.pages) {
              page.conceptAndProps.forEach((conceptAndProp: ConceptAndProperties) => {
                let exists = false;
                conceptsAndProps.forEach((cap) => {
                  if (cap.name === conceptAndProp.name) {
                    exists = true;
                  }
                });
                if (!exists) {
                  conceptsAndProps.push({
                    name: conceptAndProp.name,
                    properties: conceptAndProp.properties,
                  });
                }
                if (uiState.brand) {
                  let bindingsList: UserInterfaceBindings = {};
                  for (const comp of page.compositions) {
                    if (comp.bindings) {
                      bindingsList = {
                        ...bindingsList,
                        ...comp.bindings,
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
                properties: ['state', uiState.brand],
              });
            } else {
              conceptsAndProps.push({
                name: userInterfaceClientName,
                properties: ['state'],
              });
            }
            if (uiState.goal === commandLineInterfaceGoals.dynamicDeployment) {
              console.log('CHECK IF THIS HITS');
              const [____, contextStrategy] = userInterfaceServerPrepareContextConceptsStitch(
                fileSystemState.root,
                conceptsAndProps,
                Object.keys(concepts[conceptSemaphore].muxifiedRecord),
                fileSystemState.conceptDirectoryMap,
                d
              );
              dispatch(strategyBegin(contextStrategy), {
                iterateStage: true,
              });
            } else {
              const contextStrategy = userInterfaceServerPrepareStaticConceptsStrategy(
                fileSystemState.root,
                conceptsAndProps,
                Object.keys(concepts[conceptSemaphore].muxifiedRecord),
                fileSystemState.conceptDirectoryMap,
                uiState.pages,
                d
              );
              dispatch(strategyBegin(contextStrategy), {
                iterateStage: true,
              });
            }
          }
        }
      }
    }),
    createStage(({ stagePlanner }) => {
      stagePlanner.conclude();
    }),
  ]);
};
/*#>*/
