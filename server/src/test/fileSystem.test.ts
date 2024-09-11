/*<$
For the graph programming framework Stratimux and the huirth Project, generate a test to ensure that the file system is loaded and working as intended.
$>*/
/*<#*/
import { Concepts, axiumSelectOpen, createAxium, createStage, selectSlice, selectState, strategyBegin } from '@phuire/stratimux';
import { FileSystemState, createFileSystemConcept, fileSystemName } from '../concepts/fileSystem/fileSystem.concept';
import { userInterfaceServerSetConceptDirectoriesFromDataStrategy } from '../concepts/userInterfaceServer/strategies/setConceptDirectories.strategy';

function selectUnifiedState<T>(concepts: Concepts, semaphore: number): T | undefined {
  const exists = Object.keys(concepts).includes(`${semaphore}`);
  if (exists) {
    return concepts[semaphore].state as T;
  } else {
    return undefined;
  }
}

test('FileSystem get Concept Directory Test', (done) => {
  const axium = createAxium('axiumStrategyTest', [createFileSystemConcept()]);
  const plan = axium.plan('File System Map Concept Directory Test', [
    createStage(
      (concepts, dispatch) => {
        console.log('CHECK UNIFIED', selectUnifiedState(concepts, 2));
        if (selectSlice(concepts, axiumSelectOpen) === true) {
          const fileSystemState = selectState(concepts, fileSystemName) as FileSystemState;
          dispatch(strategyBegin(userInterfaceServerSetConceptDirectoriesFromDataStrategy(fileSystemState.root)), {
            iterateStage: true,
          });
        }
      },
      { selectors: [axiumSelectOpen] }
    ),
    createStage((concepts) => {
      const fileSystemState = selectState(concepts, fileSystemName) as FileSystemState;
      if (fileSystemState.conceptDirectoryMap.length > 1) {
        expect(fileSystemState.conceptDirectoryMap.length).toBe(12);
        console.log('CHECK MAP FORMAT', fileSystemState.conceptDirectoryMap);
        setTimeout(() => {
          done();
        }, 1000);
        plan.conclude();
      }
    }),
  ]);
});
/*#>*/
