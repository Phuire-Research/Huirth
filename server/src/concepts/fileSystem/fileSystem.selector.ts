import { Concepts, KeyedSelector } from 'stratimux';
import { FileSystemState } from './fileSystem.concept';
import { createUnifiedSelector } from '../../model/selectors';

export const selectUnifiedRoot = (concepts: Concepts, semaphore: number) =>
  createUnifiedSelector<FileSystemState>(concepts,semaphore, 'root');