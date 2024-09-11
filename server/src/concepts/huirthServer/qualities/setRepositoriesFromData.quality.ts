/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that sets the initial project status based on their existence in the incoming data field.
$>*/
/*<#*/
import { Action, createQualityCard, defaultMethodCreator, strategyData_select } from '@phuire/stratimux';
import { GetDirectoriesAndFilesDataField } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import { DPO_DataSet } from '../../../model/huirth';
import { huirthState } from '../../huirth/huirth.concept';
import { PhuirEProjects, ProjectStatus } from '../../huirth/huirth.model';

export type SetRepositoriesFromDataField = {
  trainingData: DPO_DataSet;
};

export const [huirthServerSetRepositoriesFromData, huirthServerSetRepositoriesFromDataType, huirthServerSetRepositoriesFromDataQuality] =
  createQualityCard({
    type: 'huirth Server set initial project status from data',
    reducer: (state: huirthState, action: Action): huirthState => {
      if (action.strategy) {
        const data = strategyData_select(action.strategy) as GetDirectoriesAndFilesDataField;
        if (data) {
          let stratimuxExists = false;
          let huirthExists = false;
          const projectsStatuses: { name: string; status: ProjectStatus }[] = [];
          for (const dir of data.directories) {
            switch (dir.name.toLowerCase()) {
              case PhuirEProjects.stratimux.toLocaleLowerCase(): {
                stratimuxExists = true;
                break;
              }
              case PhuirEProjects.huirth.toLocaleLowerCase(): {
                huirthExists = true;
                break;
              }
              default: {
                projectsStatuses.push({ name: dir.name, status: ProjectStatus.installed });
              }
            }
          }
          console.log('CHECK INSTALLED STATUSES', projectsStatuses);
          return {
            ...state,
            stratimuxStatus: stratimuxExists ? ProjectStatus.installed : ProjectStatus.notInstalled,
            huirthStatus: huirthExists ? ProjectStatus.installed : ProjectStatus.notInstalled,
            projectsStatuses,
          };
        }
      }
      return {
        ...state,
      };
    },
    methodCreator: defaultMethodCreator,
  });
/*#>*/
