/*<$
For the graph programming framework Stratimux and File System Concept, generate a quality that will set the concept's concept directory map property from the supplied ActionStrategy data field.
$>*/
/*<#*/
import {
  Action,
  createQualitySet,
  defaultMethodCreator,
  strategyData_select,
} from 'stratimux';
import { FileSystemState } from '../fileSystem.concept';
import { GetDirectoriesDataField } from './getDirectories.quality';

export const [
  fileSystemServerSetConceptDirectoriesFromData,
  fileSystemServerSetConceptDirectoriesFromDataType,
  fileSystemServerSetConceptDirectoriesFromDataQuality
] = createQualitySet({
  type: 'File System set Concept Directories from Strategy Data',
  reducer: (state: FileSystemState, action: Action): FileSystemState => {
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
  },
  methodCreator: defaultMethodCreator
});
/*#>*/