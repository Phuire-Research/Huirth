import { Concepts, axiumSelectOpen, createAxium, selectState, strategyBegin } from 'stratimux';
import { FileSystemState, createFileSystemConcept, fileSystemName } from '../concepts/fileSystem/fileSystem.concept';
import {
  userInterfaceServerSetConceptDirectoriesFromDataStrategy
} from '../concepts/userInterfaceServer/strategies/setConceptDirectories.strategy';

function selectUnifiedState<T>(concepts: Concepts, semaphore: number): T | undefined {
  const exists = Object.keys(concepts).includes(`${semaphore}`);
  if (exists) {
    return concepts[semaphore].state as T;
  } else {
    return undefined;
  }
}

test('FileSystem get Concept Directory Test', (done) => {
  const axium = createAxium('axiumStrategyTest', [
    createFileSystemConcept()
  ], true, true);
  const plan = axium.stage('File System Map Concept Directory Test', [
    (concepts, dispatch) => {
      console.log('CHECK UNIFIED', selectUnifiedState(concepts, 2));
      const fileSystemState = selectState(concepts, fileSystemName) as FileSystemState;
      dispatch(strategyBegin(userInterfaceServerSetConceptDirectoriesFromDataStrategy(fileSystemState.root)), {
        iterateStage: true,
        on: {
          selector: axiumSelectOpen,
          expected: true
        },
      });
    },
    (concepts) => {
      const fileSystemState = selectState(concepts, fileSystemName) as FileSystemState;
      if (fileSystemState.conceptDirectoryMap.length > 1) {
        expect(fileSystemState.conceptDirectoryMap.length).toBe(8);
        console.log('CHECK MAP FORMAT', fileSystemState.conceptDirectoryMap);
        setTimeout(() => {
          done();
        }, 1000);
        plan.conclude();
      }
    }
  ]);
});
