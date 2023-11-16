export type Final_DPO = Record<
  string,
  {
    chosen: [
      {
        content: string;
      }
    ];
    rejected: [
      {
        content: string;
      }
    ];
  }
>;
export type Active_DPO = {
  prompt: string;
  chosen: string;
  rejected: string;
};

export type NamedDataSet = {
  name: string;
  dataSet: Record<string, unknown>;
};

export type TrainingData = NamedDataSet[];

export const generateDPOTrainingData = (): Active_DPO => ({
  prompt: '#insert prompt#',
  chosen: '#insert chosen output#',
  rejected: '#insert rejected output#',
});

export const generateDefaultNamedDataSet = (name: string): NamedDataSet => ({
  name,
  dataSet: {
    prompt: '#insert prompt#',
    content: '#insert chosen output#',
  },
});

export const generateDefaultTrainingData = (): TrainingData => [generateDefaultNamedDataSet('newDataSet0')];

export const promptID = '#promptID-';
export const chosenID = '#chosenID-';
export const rejectedID = '#rejectedID-';

export function generateNumID(number: number) {
  if (number < 10) {
    return `00${number}`;
  } else if (number < 100) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
}

export function selectTrainingDataIndex(element: HTMLElement, key: string) {
  console.log('CHECK ERROR', element, key);
  return Number(element.id.split(key)[1]);
}
