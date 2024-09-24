/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate a quality that reads a data set based on the incoming data field and unifies such back into the ActionStrategy data.
$>*/
/*<#*/
import {
  createAsyncMethod,
  createQualityCard,
  nullReducer,
  strategyData_appendFailure,
  strategyData_select,
  strategyData_muxifyData,
  strategyFailed,
  strategySuccess,
} from '@phuire/stratimux';
import { GetDirectoriesAndFilesDataField } from '../../fileSystem/qualities/getDirectoriesAndFiles.quality';
import fs from 'fs/promises';
import { convertSavedFormatToNamedDataSet, huirthServerFailureConditions } from '../huirthServer.model';
import path from 'path';
import { FileDirent } from '../../fileSystem/fileSystem.model';
import { NamedDataSet, TrainingData } from '../../huirth/huirth.model';

async function readAllDirectories(fileDirent: FileDirent[]): Promise<TrainingData> {
  const data: TrainingData = [];
  for (const fD of fileDirent) {
    if (fD.isDirectory()) {
      const contents = (await fs.readdir(path.join(fD.path + '/' + fD.name), {
        withFileTypes: true,
      })) as FileDirent[];
      for (const entry of contents) {
        if (entry.isFile()) {
          try {
            const json = JSON.parse((await fs.readFile(path.join(entry.path + '/' + entry.name))).toString());
            const keys = Object.keys(json);
            // eslint-disable-next-line max-depth
            if (json[keys[0]] && Object.keys(json[keys[0]]).includes('content')) {
              const set: NamedDataSet = convertSavedFormatToNamedDataSet(json, fD.name);
              data.push(set);
            }
          } catch (error) {
            console.error('ERROR AT READ ALL DIRECTORIES huirth SERVER READ FROM DATA TRAINING DATA', error);
          }
        }
      }
    }
  }
  return data;
}

export type ReadFromDataTrainingDataFromDirectoriesField = {
  trainingData: TrainingData;
};

export const huirthServerReadFromDataTrainingDataFromDirectories = createQualityCard({
  type: 'huirth Server read from File System Data, Directories and Files',
  reducer: nullReducer,
  methodCreator: () =>
    createAsyncMethod((controller, action) => {
      if (action.strategy && action.strategy.data) {
        const strategy = action.strategy;
        const data = strategyData_select(action.strategy) as GetDirectoriesAndFilesDataField;
        console.log('READ FROM DATA TRAINING CHECK', data);
        if (data.directories) {
          if (data.directories.length !== 0) {
            try {
              readAllDirectories(data.directories).then((trainingData) => {
                controller.fire(
                  strategySuccess(
                    strategy,
                    strategyData_muxifyData(strategy, {
                      trainingData,
                    })
                  )
                );
              });
            } catch (error) {
              controller.fire(
                strategyFailed(strategy, strategyData_appendFailure(strategy, huirthServerFailureConditions.failedParsingTrainingData))
              );
            }
          } else {
            controller.fire(
              strategyFailed(action.strategy, strategyData_appendFailure(action.strategy, huirthServerFailureConditions.noTrainingData))
            );
          }
        }
      } else {
        controller.fire(action);
      }
    }),
});
/*#>*/
