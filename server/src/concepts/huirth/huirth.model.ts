/*<$
For the graph programming framework Stratimux and a Concept huirth, generate the model file contents.
$>*/
/*<#*/
// eslint-disable-next-line no-shadow
export enum ProjectStatus {
  notInstalled = 'Not Installed',
  installing = 'Installing',
  installed = 'Installed',
  parsing = 'Data Parsing...',
  parsed = 'Data Parsed',
  saving = 'Saving...',
  saved = 'Saved',
  pulled = 'Pulled',
}

export type GeneralProjectStatuses = {name: string, status: ProjectStatus}[];

// eslint-disable-next-line no-shadow
export enum PhuirEProjects {
  stratimux = 'stratimux',
  stratimuxURL = 'https://github.com/Phuire-Research/Stratimux',
  huirth = 'huirth',
  huirth_URL = 'https://github.com/Phuire-Research/huirth'
}

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

export type BaseDataSet = {
  prompt: string,
  content: string,
} & Record<string, string>

// eslint-disable-next-line no-shadow
export enum DataSetTypes {
  general = 'general',
  project = 'project',
  dpo = 'dpo',
}

export type NamedDataSet = {
  name: string,
  type: DataSetTypes,
  dataSet: BaseDataSet[]
  index: number
}

export type TrainingData = NamedDataSet[];

export const generateDPOTrainingData = (): Active_DPO => ({
  prompt: '#insert prompt#',
  chosen: '#insert chosen output#',
  rejected: '#insert rejected output#'
});

export const generateBaseDataSetEntry = (): BaseDataSet => {
  return {
    prompt: '#insert prompt#',
    content: '#insert chosen output#',
  };
};

export const generateDefaultNamedDataSet = (name: string): NamedDataSet => ({
  name,
  type: DataSetTypes.general,
  dataSet: [generateBaseDataSetEntry()],
  index: 0
});

export const generateDefaultTrainingData = (): TrainingData => [];

export const dataSetNameID = '#dataSetNameID-';
export const dataSetSelectionID = '#dataSetSelectionID-';
export const promptID = '#promptID-';
export const contentID = '#contentID-';
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

// Transformation Strategies on server
export const huirthVerboseAddingStrategySelect = 'Verbose Adding Transformation Strategy';
export const huirthVerboseSubtractionStrategySelect = 'Verbose Subtraction Transformation Strategy';
export const huirthVerboseAdditionAndSubtractionStrategySelect = 'Verbose Addition and Subtraction Transformation Strategy';

/*#>*/