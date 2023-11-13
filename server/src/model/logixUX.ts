export type DPO = {
  chosen: [{
    content: string
  }],
  rejected: [{
    content: string
  }]
}
export type DataSet<T> = Record<string, T>;
export type DPO_DataSet = DataSet<DPO>;