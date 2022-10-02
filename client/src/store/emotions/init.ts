import { domain } from '../domain/state';

import { $emotions, emotionsStore } from './state';
import api from '../../api';

export const getEmotions = domain.createEffect(() => {
    // const emotions = api.get<emotionsStore>('/emotions');
    const emotions = {
        angry: 10,
        fear: 11,
        happy: 11,
        neutral: 3,
        sad: 1,
        surprise: 0,
    };

    return emotions;
});

$emotions.on(getEmotions.doneData, (_, v) => v);

getEmotions();
