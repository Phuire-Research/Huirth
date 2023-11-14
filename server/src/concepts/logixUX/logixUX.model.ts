export type Final_DPO = Record<string, {
  chosen: [{
    content: string
  }],
  rejected: [{
    content: string
  }]
}>
export type Active_DPO = {
  prompt: string,
  chosen: string,
  rejected: string
}

export const generateDefaultTrainingData = (): Active_DPO => ({
  prompt: '#insert prompt#',
  chosen: '#insert chosen output#',
  rejected: '#insert rejected output#'
});

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
  return Number(element.id.split(key)[1]);
}
