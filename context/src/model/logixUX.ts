/*<$
For the framework Stratimux and the logixUX Project, generate a model that contains the type definitions for the DPO Dataset
$>*/
/*<#*/
export type DPO = {
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
};
export type DataSet<T> = Record<string, T>;
export type DPO_DataSet = DataSet<DPO>;
/*#>*/
