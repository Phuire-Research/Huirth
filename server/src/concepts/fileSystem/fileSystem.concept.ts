/*<$
For the graph programming framework Stratimux generate a File System Concept that will store the current projects root and concept directory map.
$>*/
/*<#*/
import { createConcept, Concept } from '@phuire/stratimux';
import { fileSystemGetDirectories } from './qualities/getDirectories.quality';
import { fileSystemRemoveTargetDirectory } from './qualities/removeTargetDirectory.quality';
import { fileSystemCreateTargetDirectory } from './qualities/createTargetDirectory.quality';
import { fileSystemCopyMoveTargetDirectory } from './qualities/copyMoveDirectory.quality';
import { findRoot } from '../../model/findRoot';
import { fileSystemRecursivelyCopyMoveTargetDirectories } from './qualities/recursivelyCopyMoveDirectories.quality';
import { fileSystemServerSetConceptDirectoriesFromData } from './qualities/setConceptDirectoriesFromData.quality';
import { fileSystemCreateFileWithContentsIndex } from './qualities/createFileWithContents.quality';
import { fileSystemGetDirectoriesAndFiles } from './qualities/getDirectoriesAndFiles.quality';
import { fileSystemReadDirectory } from './qualities/readDir.quality';
import { fileSystemFilterFilesAndDirectories } from './qualities/filterFilesAndDirectories.quality';
import { fileSystemReadFileContentsAndAppendToData } from './qualities/readFileContentsAndAppendToData.quality';

export type FileSystemState = {
  conceptDirectoryMap: string[];
  root: string;
};

export const fileSystemName = 'fileSystem';

const createFileSystemState = (): FileSystemState => {
  return {
    conceptDirectoryMap: [],
    root: findRoot(),
  };
};

const qualities = {
  fileSystemGetDirectories,
  fileSystemRemoveTargetDirectory,
  fileSystemCreateTargetDirectory,
  fileSystemCopyMoveTargetDirectory,
  fileSystemRecursivelyCopyMoveTargetDirectories,
  fileSystemServerSetConceptDirectoriesFromData,
  fileSystemCreateFileWithContentsIndex,
  fileSystemGetDirectoriesAndFiles,
  fileSystemReadDirectory,
  fileSystemFilterFilesAndDirectories,
  fileSystemReadFileContentsAndAppendToData,
};

export type FileSystemDeck = {
  fileSystem: Concept<FileSystemState, typeof qualities>;
};

export const createFileSystemConcept = () => {
  return createConcept(fileSystemName, createFileSystemState(), qualities, [], []);
};
/*#>*/
