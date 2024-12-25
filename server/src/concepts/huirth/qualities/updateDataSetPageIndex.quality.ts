/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a quality that updates a DataSet's current page position determined via an increase boolean property set by incoming payload.
$>*/
/*<#*/
import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { huirthState } from '../huirth.concept';

export type huirthUpdateDataSetPageIndexPayload = {
  index: number;
  increase: boolean;
};

export const huirthUpdateDataSetPageIndex = createQualityCardWithPayload<huirthState, huirthUpdateDataSetPageIndexPayload>({
  type: 'huirth Update DataSet Page Index',
  reducer: (state, action) => {
    const { index, increase } = action.payload;
    const target = state.trainingData[index].index;
    const max = state.trainingData[index].dataSet.length;
    if (target + 10 > max && increase) {
      console.log('1HITTING DATASET PAGE INDEX', target, max);
      return {};
    } else if (target - 10 < 0 && !increase) {
      console.log('2HITTING DATASET PAGE INDEX', target, max);
      return {};
    } else {
      console.log('3HITTING DATASET PAGE INDEX', target, max);
      const trainingData = [...state.trainingData];
      trainingData[index].index = increase ? target + 10 : target - 10;
      return {
        trainingData,
      };
    }
  },
  methodCreator: defaultMethodCreator,
});
/*#>*/
