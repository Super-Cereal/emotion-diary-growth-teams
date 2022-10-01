import b_ from 'b_';
import cx from 'classnames';
import { useStore } from 'effector-react';
import { createRef, LegacyRef, useEffect } from 'react';

import { $emotions } from '../../store/emotions';

import './Hexagon.scss';

export const b = b_.with('hexagon');

export const Hexagon = () => {
    const emotions = useStore($emotions);

    const angry = emotions?.angry ?? 1;
    const fear = emotions?.fear ?? 1;
    const sad = emotions?.sad ?? 1;
    const happy = emotions?.happy ?? 1;
    const neutral = emotions?.neutral ?? 1;
    const surprise = emotions?.surprise ?? 1;

    return <canvas id="canvas" width="800" height="500" />;
};
