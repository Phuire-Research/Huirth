import { AxiumState, Concepts } from 'stratimux';

export const getUnifiedName = (concepts: Concepts, semaphore: number): string | undefined => concepts[semaphore]?.name;
export const getAxiumState = (concepts: Concepts) => concepts[0].state as AxiumState;
export const getUnifiedList = (concepts: Concepts, semaphore: number): string[] | undefined => concepts[semaphore]?.unified;
