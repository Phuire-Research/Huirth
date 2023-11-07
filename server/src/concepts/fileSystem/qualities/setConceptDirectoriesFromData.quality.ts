import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
  strategyData_select,
} from 'stratimux';
import { FileSystemState } from '../fileSystem.concept';
import { GetDirectoriesDataField } from './getDirectories.quality';

export const fileSystemServerSetConceptDirectoriesFromDataType: ActionType =
  'File System set Concept Directories from Strategy Data';
export const fileSystemServerSetConceptDirectoriesFromData = prepareActionCreator(fileSystemServerSetConceptDirectoriesFromDataType);

function addComposedPageToState(state: FileSystemState, action: Action): FileSystemState {
  if (action.strategy && action.strategy.data) {
    const data = strategyData_select(action.strategy) as GetDirectoriesDataField;
    if (data.directories) {
      return {
        ...state,
        conceptDirectoryMap: data.directories
      };
    }
  }
  return {
    ...state,
  };
}

export const fileSystemServerSetConceptDirectoriesFromDataQuality = createQuality(
  fileSystemServerSetConceptDirectoriesFromDataType,
  addComposedPageToState,
  defaultMethodCreator,
);
