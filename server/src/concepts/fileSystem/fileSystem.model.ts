/*<$
For the graph programming framework Stratimux and File System Concept, generate a model file with all types required for it to function.
$>*/
/*<#*/
import { Dirent } from 'fs';

export type FileDirent = {path: string} & Dirent;
/*#>*/