/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the model file contents that will handle Data Sets, Failure Conditions, and Tokens.
$>*/
/*<#*/
// import { DPO_DataSet } from '../../model/huirth';
import { Active_DPO, BaseDataSet, DataSetTypes, NamedDataSet, TrainingData } from '../huirth/huirth.model';

// eslint-disable-next-line no-shadow
export enum huirthServerFailureConditions {
  noTrainingData = 'noTrainingData',
  failedParsingTrainingData = 'failedParsingTrainingData',
}

// eslint-disable-next-line no-shadow
export enum dataDirectories {
  gitRepo = 'repositories',
  sets = 'sets',
}

// Borked on purpose. Fix later if we need DPO
export const convertDPOToSaveFormatDPO = (trainingData: Active_DPO[]) => {
  const saveFormat: SavedFormat = {
    name: 'dpo',
    data: trainingData.map<BaseDataSet>((entry) => {
      return {
        contents: [{ text: entry.prompt }],
      };
    }),
    type: DataSetTypes.dpo,
  };
  return saveFormat;
};

export type SavedFormat = {
  name: string;
  type: DataSetTypes;
  data: BaseDataSet[];
};

export type ArcChallengeFormat = {
  train: {
    input: number[][];
    output: number[][];
  }[];
  test: {
    input: number[][];
    output: number[][];
  }[];
};

export const convertNamedDataSetToSaveFormat = (named: NamedDataSet) => {
  const saveFormat: SavedFormat = {
    name: named.name,
    type: named.type,
    data: named.dataSet,
  };
  return saveFormat;
};

export type JSONLSavedFormat = {
  systemInstruction?: {
    role: string;
    parts: {
      text: string;
    }[];
  };
  contents: {
    role?: string;
    parts: {
      text: string;
    }[];
  }[];
};

const cleanPrompt = (str: string) => {
  if (str.includes('.) ')) {
    return str.split('.) ')[1];
  } else {
    return str;
  }
};

export const convertNamedDataSetToJSONLSavedFormat = (named: NamedDataSet) => {
  let output = '';
  named.dataSet.forEach((set) => {
    const JSONL: JSONLSavedFormat = set.systemInstructions
      ? {
          systemInstruction: {
            role: 'model',
            parts: [
              {
                text: set.systemInstructions as string,
              },
            ],
          },
          contents: set.contents.map((entry) => {
            if (entry.role !== 'unset') {
              return {
                role: entry.role,
                parts: [
                  {
                    text: entry.text,
                  },
                ],
              };
            }
            return {
              parts: [
                {
                  text: entry.text,
                },
              ],
            };
          }),
        }
      : {
          contents: set.contents.map((entry) => {
            if (entry.role !== 'unset') {
              return {
                role: entry.role,
                parts: [
                  {
                    text: entry.text,
                  },
                ],
              };
            }
            return {
              parts: [
                {
                  text: entry.text,
                },
              ],
            };
          }),
        };
    output += JSON.stringify(JSONL) + '\n';
  });
  return output;
};

export const convertSavedFormatToNamedDataSet = (saved: SavedFormat, name: string) => {
  const named: NamedDataSet = {
    name,
    type: saved.type,
    dataSet: saved.data,
    index: 0,
  };
  return named;
};

// Borked on purpose. Fix later if we need DPO
export const convertSaveFormatDPOToDPO = (named: NamedDataSet) => {
  const DPO: Active_DPO[] = [];
  for (const set of named.dataSet) {
    for (const entry of set.contents) {
      DPO.push({
        prompt: entry.text,
        chosen: entry.text,
        rejected: entry.text,
      });
    }
  }
  return DPO;
};

export const TRANSFORMATION_DATASET_LIMIT = 15;

export const DEFAULT_SYSTEM_PROMPT = (names: string[], enhancement?: string) =>
  enhancement
    ? `
You are currently Embodying the Stratimux Framework, a Graph Programming Framework purpose built as an Artificial Intelligence Operating System.

${enhancement}

Your Starting Stratideck is as Follows: [ ${names.join(', ')} ]
`
    : `
You are currently Embodying the Stratimux Framework, a Graph Programming Framework purpose built as an Artificial Intelligence Operating System.

Your Starting Stratideck is as Follows: [ ${names.join(', ')} ]
`;

/*#>*/
/*<!!>*/
// eslint-disable-next-line no-shadow
export enum ParsingTokens {
  promptBegin = '/*<$',
  promptEnd = '$>*/',
  contentBegin = '/*<#*/',
  contentEnd = '/*#>*/',
  importBegin = '/*<@',
  importEnd = '@>*/',
  includeBegin = '/*<%',
  includeEnd = '%>*/',
  excludeBegin = '/*<!*/',
  excludeEnd = '/*!>*/',
  stop = '/*<!!>*/',
}
