/*<$
For the graph programming framework Stratimux and File System Concept, generate a series of unified selectors to select the Concept's properties.
$>*/
/*<#*/
import { Concepts, createMuxifiedKeyedSelector } from 'stratimux';
import { FileSystemState } from './fileSystem.concept';

export const selectUnifiedRoot = (concepts: Concepts, semaphore: number) =>
  createMuxifiedKeyedSelector<FileSystemState>(concepts, semaphore, 'root');
/*#>*/
