import b_ from 'b_';
import React from 'react';

import { dataByType, AboutEmotionSectionType } from './data';

import './AboutEmotionSection.scss';

interface Props {
    type?: AboutEmotionSectionType;
}

const b = b_.with('about-emotion-section');

export const AboutEmotionSection = ({ type = AboutEmotionSectionType.HAPPY }: Props) => {
    const { title, descriptionParagraphs, imageSrc } = dataByType[type];

    return <section className={b()}>
        <span className={b('title')}>{title}</span>
        <div className={b('img-wrapper')}>
            <img className={b('img')} src={imageSrc} alt='emotion-img' />
        </div>
        <div className={b('paragraphs')}>
            {descriptionParagraphs.map((paragraph) => (<span className={b('paragraph')}>{paragraph}</span>))}
        </div>
    </section>
}