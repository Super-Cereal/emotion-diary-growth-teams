import { createStore } from 'effector';

export interface emotionsStore {
    angry: number;
    fear: number;
    happy: number;
    neutral: number;
    sad: number;
    surprise: number;
}

export const $emotions = createStore<emotionsStore | null>(null);
