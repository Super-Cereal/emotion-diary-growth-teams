import b_ from 'b_';
import React from 'react';
import { AnlyticsSection } from '../../components/AnlyticsSection/AnlyticsSection';

const b = b_.with('journal-page');

export const JournalPage = () => {
    return (
        <div className={b()}>
            <div className={b('video')}>
                <canvas id="output" />
                <video
                    id="webcam"
                    playsInline
                    style={{
                        visibility: 'hidden',
                        width: 'auto',
                        height: 'auto',
                    }}
                ></video>
            </div>
            <AnlyticsSection />
        </div>
    );
};
