import { domain } from '../domain/state';

import { $emotions, emotionsStore } from './state';
import api from '../../api';

export const getEmotions = domain.createEffect(() => {
    const emotions = api.get<emotionsStore>('/emotions');

    return emotions;
});

export const postEmotions = domain.createEffect((emotions: emotionsStore) => {
    return api.postEmotions(emotions);
});

$emotions.on(getEmotions.doneData, (_, v) => v);

getEmotions();
