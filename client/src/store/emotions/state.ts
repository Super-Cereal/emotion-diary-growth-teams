import { domain } from './../domain/state';

export enum Emotions {
    angry = 'angry',
    fear = 'fear',
    happy = 'happy',
    neutral = 'neutral',
    sad = 'sad',
    surprise = 'surprise',
}

export type emotionsStore = Record<Emotions, number>;

export const $emotions = domain.createStore<emotionsStore | null>(null);
