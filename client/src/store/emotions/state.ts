import { domain } from './../domain/state';

export interface emotionsStore {
    angry: number;
    fear: number;
    happy: number;
    neutral: number;
    sad: number;
    surprise: number;
}

export const $emotions = domain.createStore<emotionsStore | null>(null);
