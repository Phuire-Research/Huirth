/*<$
For the graph programming framework Stratimux and the huirth Project, generate a test to ensure that the file system is loaded and working as intended.
$>*/
/*<#*/
import { Concepts, muxiumSelectOpen, muxification, createStage, selectSlice, selectState, strategyBegin } from 'stratimux';
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
  const muxium = muxification('muxiumStrategyTest', [createFileSystemConcept()]);
  const plan = muxium.plan('File System Map Concept Directory Test', [
    createStage(
      (concepts, dispatch) => {
        console.log('CHECK UNIFIED', selectUnifiedState(concepts, 2));
        if (selectSlice(concepts, muxiumSelectOpen) === true) {
          const fileSystemState = selectState(concepts, fileSystemName) as FileSystemState;
          dispatch(strategyBegin(userInterfaceServerSetConceptDirectoriesFromDataStrategy(fileSystemState.root)), {
            iterateStage: true,
          });
        }
      },
      { selectors: [muxiumSelectOpen] }
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
