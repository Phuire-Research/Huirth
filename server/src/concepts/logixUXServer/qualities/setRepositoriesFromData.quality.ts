/*<$
For the framework Stratimux and a Concept logixUX Server, generate a quality that sets the initial project status based on their existence in the incoming data field.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  createQuality,
  defaultMethodCreator,
  prepareActionCreator,
  strategyData_select,
} from 'stratimux';
import { GetDirectoriesAndFilesDataField } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { DPO_DataSet } from '../../../model/logixUX';
import { LogixUXState } from '../../logixUX/logixUX.concept';
import { PhuirEProjects, ProjectStatus } from '../../logixUX/logixUX.model';

export const logixUXServerSetRepositoriesFromDataType: ActionType =
  'logixUX Server set initial project status from data';
export const logixUXServerSetRepositoriesFromData =
  prepareActionCreator(logixUXServerSetRepositoriesFromDataType);
export type SetRepositoriesFromDataField = {
  trainingData: DPO_DataSet
}

const logixUXServerSetRepositoriesFromDataReducer = (state: LogixUXState, action: Action): LogixUXState => {
  if (action.strategy) {
    const data = strategyData_select(action.strategy) as GetDirectoriesAndFilesDataField;
    if (data) {
      let stratimuxExists = false;
      let logixUXExists = false;
      const projectsStatuses: {name: string, status: ProjectStatus}[] = [];
      for (const dir of data.directories) {
        switch (dir.name) {
        case PhuirEProjects.stratimux: {
          stratimuxExists = true;
          break;
        }
        case PhuirEProjects.logixUX: {
          logixUXExists = true;
          break;
        }
        default: {
          projectsStatuses.push({name: dir.name, status: ProjectStatus.installed});
        }
        }
      }
      return {
        ...state,
        stratimuxStatus: stratimuxExists ? ProjectStatus.installed : ProjectStatus.notInstalled,
        logixUXStatus: logixUXExists ? ProjectStatus.installed : ProjectStatus.notInstalled,
        projectsStatuses,
      };
    }
  }
  return {
    ...state
  };
};

export const logixUXServerSetRepositoriesFromDataQuality = createQuality(
  logixUXServerSetRepositoriesFromDataType,
  logixUXServerSetRepositoriesFromDataReducer,
  defaultMethodCreator,
);
/*#>*/