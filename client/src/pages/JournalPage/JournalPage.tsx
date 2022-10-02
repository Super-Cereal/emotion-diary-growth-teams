import b_ from 'b_';
import React  from 'react';

import './JournalPage.scss';

import { AnlyticsSection } from '../../components/AnlyticsSection/AnlyticsSection';

const b = b_.with('journal-page');

export const JournalPage = () => {
    return (
        <div className={b()}>
            <AnlyticsSection />
        </div>
    );
}
