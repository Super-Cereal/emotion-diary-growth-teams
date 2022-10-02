import { domain } from '../domain/state';

import { $emotions, emotionsStore } from './state';
import api from '../../api';

export const getEmotions = domain.createEffect(() => {
    const emotions = api.get<emotionsStore>('/emotion-state');

    return emotions;
});

export const postEmotions = domain.createEffect(
    async (emotions: emotionsStore) => {
        await api.postEmotions(emotions);
        getEmotions();
    },
);

$emotions.on(getEmotions.doneData, (_, v) => v);
