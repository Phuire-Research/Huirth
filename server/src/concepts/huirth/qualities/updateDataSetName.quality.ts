/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's associated Page name by index and set by event target value.
$>*/
/*<#*/
import {
  Action,
  Concepts,
  axiumKick,
  createActionNode,
  createMethodWithState,
  createQualitySetWithPayload,
  createStrategy,
  selectPayload,
  strategyBegin,
} from 'stratimux';
import { huirthState } from '../huirth.concept';
import { userInterface_selectInputTarget } from '../../../model/userInterface';
import { DataSetTypes, PhuirEProjects, ProjectStatus } from '../huirth.model';
import { Subject } from 'rxjs';
import { huirthSendRemoveAddTrainingPageStrategy } from './sendTriggerRemoveAddTrainingPageStrategy.quality';
import { webSocketClientForceSync } from '../../webSocketClient/qualities/forceSync.quality';

export type huirthUpdateDataSetNamePayload = {
  index: number,
}

export const [
  huirthUpdateDataSetName,
  huirthUpdateDataSetNameType,
  huirthUpdateDataSetNameQuality
] = createQualitySetWithPayload<huirthUpdateDataSetNamePayload>({
  type: 'Create huirth UpdateDataSetName',
  reducer: (state: huirthState, action: Action): huirthState => {
    const payload = selectPayload<huirthUpdateDataSetNamePayload>(action);
    const target = userInterface_selectInputTarget(action);
    const trainingData = [...state.trainingData];
    let {stratimuxStatus, huirthStatus} = state;
    const {projectsStatuses} = state;
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
      ...state,
      trainingData,
      stratimuxStatus,
      huirthStatus,
      projectsStatuses
    };
  },
  methodCreator: (concepts$, semaphore) => createMethodWithState<huirthState>((action, state) => {
    const payload = selectPayload<huirthUpdateDataSetNamePayload>(action);
    const oldName = state.trainingData[payload.index].name;
    const newName = userInterface_selectInputTarget(action).value;
    const removeAdd = createActionNode(huirthSendRemoveAddTrainingPageStrategy({oldName, newName}));
    const kick = createActionNode(axiumKick(), {
      successNode: removeAdd
    });
    const forceSync = createActionNode(webSocketClientForceSync({
      keys: ['trainingData']
    }) , {
      successNode: kick
    });
    const sendRemoveAddTrainingDataPage = createStrategy({
      topic: 'Send to server to trigger remove add training data page strategy',
      initialNode: forceSync,
      priority: 3000
    });
    return strategyBegin(sendRemoveAddTrainingDataPage);
  }, concepts$ as Subject<Concepts>, semaphore as number)
});
/*#>*/