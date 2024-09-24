/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's associated Page name by index and set by event target value.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  axiumKick,
  axiumRegisterTimeOut,
  createActionNode,
  createMethodWithState,
  createQualityCardWithPayload,
  createStrategy,
  selectPayload,
  strategyBegin,
} from '@phuire/stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { DataSetTypes, PhuirEProjects, ProjectStatus } from '../huirth.model';
import { Subject } from 'rxjs';
import { huirthSendRemoveAddTrainingPageStrategy } from './sendTriggerRemoveAddTrainingPageStrategy.quality';
import { webSocketClientForceSync } from '../../webSocketClient/qualities/forceSync.quality';

export type huirthUpdateDataSetNamePayload = {
  index: number;
};

export const huirthUpdateDataSetName =
  createQualityCardWithPayload<huirthState, huirthUpdateDataSetNamePayload>({
    type: 'Create huirth UpdateDataSetName',
    reducer: (state, action) => {
      const payload = selectPayload<huirthUpdateDataSetNamePayload>(action);
      const target = userInterface_selectInputTarget(action);
      const trainingData = [...state.trainingData];
      let { stratimuxStatus, huirthStatus } = state;
      const { projectsStatuses } = state;
      const dataSet = trainingData[payload.index];
      if (dataSet && target) {
        if (dataSet.type === DataSetTypes.project) {
          const name = dataSet.name.toLowerCase();
          if (name === PhuirEProjects.stratimux) {
            stratimuxStatus = ProjectStatus.installed;
          } else if (name === PhuirEProjects.huirth) {
            huirthStatus = ProjectStatus.installed;
          } else {
            for (const project of projectsStatuses) {
              if (project.name.toLowerCase() === name) {
                project.status = ProjectStatus.installed;
              }
            }
          }
        }
        dataSet.name = target.value;
      }
      return {
        trainingData,
        stratimuxStatus,
        huirthStatus,
        projectsStatuses,
      };
    },
    methodCreator: () =>
      createMethodWithState(
        (action, state) => {
          const payload = action.payload;
          const oldName = state.trainingData[payload.index].name;
          const newName = userInterface_selectInputTarget(action).value;
          const removeAdd = createStrategy({
            topic: 'Finally send trigger remove add training data page strategy',
            initialNode: createActionNode(huirthSendRemoveAddTrainingPageStrategy.actionCreator({ oldName, newName })),
          });
          const timeOut = createActionNode(
            axiumRegisterTimeOut.actionCreator({
              act: strategyBegin(removeAdd),
              timeOut: 50,
            })
          );
          const forceSync = createActionNode(
            webSocketClientForceSync.actionCreator({
              keys: ['trainingData'],
            }),
            {
              successNode: timeOut,
            }
          );
          // return strategyBegin(sendRemoveAddTrainingDataPage);
          return strategyBegin(
            createStrategy({
              topic: 'Force Sync Training Data then time out send trigger remove add training data page',
              initialNode: forceSync,
              priority: 4000,
            })
          );
        },
      ),
  });
/*#>*/
