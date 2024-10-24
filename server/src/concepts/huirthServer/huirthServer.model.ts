/*<$
For the graph programming framework Stratimux and a Concept huirth Server, generate the model file contents that will handle Data Sets, Failure Conditions, and Tokens.
$>*/
/*<#*/
import { DPO_DataSet } from '../../model/huirth';
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

export const convertDPOToSaveFormatDPO = (trainingData: Active_DPO[]) => {
  const saveFormat: SavedFormat = {};
  trainingData.forEach((entry) => {
    saveFormat[entry.prompt] = {
      type: DataSetTypes.dpo,
      content: '',
      chosen: entry.chosen,
      rejected: entry.chosen,
    };
  });
  return saveFormat;
};

export type SavedFormat = {
  [prompt: string]: {
    type: string;
    content: string;
  } & Record<string, string>;
};

export const convertNamedDataSetToSaveFormat = (named: NamedDataSet) => {
  const saveFormat: SavedFormat = {};
  named.dataSet.forEach((entry) => {
    saveFormat[entry.prompt] = {
      type: named.type,
      content: entry.content,
    };
    const keys = Object.keys(entry);
    for (const key of keys) {
      if (key !== 'prompt' && key !== 'content' && key !== 'type') {
        saveFormat.prompt[key] = entry[key];
      }
    }
  });
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
    role: string;
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

const instruction = 'You are currently embodying Stratimux and a Muxium Deck Load of : [HuirthServerDeck, CounterDeck]';
export const convertNamedDataSetToJSONLSavedFormat = (named: NamedDataSet) => {
  let output = '';
  named.dataSet.forEach((set) => {
    const JSONL: JSONLSavedFormat = {
      systemInstruction: {
        role: 'model',
        parts: [
          {
            text: instruction,
          },
        ],
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanPrompt(set.prompt),
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: set.content,
            },
          ],
        },
      ],
    };
    output += JSON.stringify(JSONL) + '\n';
  });
  return output;
};

export const convertSavedFormatToNamedDataSet = (saved: SavedFormat, name: string) => {
  const named: NamedDataSet = {
    name,
    type: DataSetTypes.general,
    dataSet: [],
    index: 0,
  };
  const keys = Object.keys(saved);
  for (const key of keys) {
    const final: BaseDataSet = {
      prompt: key,
      content: '',
    };
    const data = saved[key];
    const dataKeys = Object.keys(data);
    for (const d of dataKeys) {
      if (d === 'type') {
        named.type = data[d] as DataSetTypes;
      } else {
        final[d] = data[d];
      }
    }
    named.dataSet.push(final);
  }
  return named;
};

export const convertSaveFormatDPOToDPO = (named: NamedDataSet) => {
  const DPO: Active_DPO[] = [];
  for (const set of named.dataSet) {
    DPO.push({
      prompt: set.prompt,
      chosen: set.chosen !== undefined ? set.chosen : '',
      rejected: set.rejected !== undefined ? set.rejected : '',
    });
  }
  return DPO;
};

export const TRANSFORMATION_DATASET_LIMIT = 25;

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
