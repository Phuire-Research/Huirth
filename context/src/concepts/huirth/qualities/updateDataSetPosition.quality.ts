/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's current position by index
and is determined via whether to move up or down based ona true false of an up property on the incoming payload.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';
import { TrainingData } from '../huirth.model';

export type huirthUpdateDataSetPositionPayload = {
  index: number;
  up: boolean;
};

export const huirthUpdateDataSetPosition = createQualityCardWithPayload<huirthState, huirthUpdateDataSetPositionPayload>({
  type: 'huirth Update DataSet Position',
  reducer: (state, action) => {
    const { index, up } = action.payload;
    if (index === 0 && up) {
      return {};
    } else if (index === state.trainingData.length - 1 && !up) {
      return {};
    } else {
      const trainingData: TrainingData = [];
      const newPos = up ? index - 1 : index + 1;
      state.trainingData.forEach((entry, i) => {
        if (i === newPos) {
          if (up) {
            trainingData.push(state.trainingData[index]);
            trainingData.push(state.trainingData[i]);
          } else {
            trainingData.push(state.trainingData[i]);
            trainingData.push(state.trainingData[index]);
          }
        } else if (i === index) {
          //
        } else {
          trainingData.push(entry);
        }
      });
      return {
        trainingData,
        dataSetSelection: new Array(state.dataSetSelection.length).fill(false),
      };
    }
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
