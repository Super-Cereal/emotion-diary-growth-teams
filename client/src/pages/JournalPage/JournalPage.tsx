import b_ from 'b_';
import * as faceapi from 'face-api.js';
import React from 'react';
import { emotionsStore } from '../../api';
import { postEmotions } from '../../store/emotions';

import bg2 from '../../assets/icons/bg2.png';
import button from '../../assets/icons/button.png';
import buttonCr from '../../assets/icons/buttonCr.png';
import './JournalPage.scss';
import { AboutEmotionSection } from '../../components/AboutEmotionSection/AboutEmotionSection';
import { AboutEmotionSectionType } from '../../components/AboutEmotionSection/data';

const b = b_.with('journal-page');

export const JournalPage = () => {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const [values, setValues] = React.useState<
        emotionsStore & { fearful: number }
    >({
        angry: 0,
        fear: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        fearful: 0,
        surprise: 0,
    });

    const videoRef = React.useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef();

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                //@ts-ignore
            ]).then(setModelsLoaded(true));
        };
        loadModels();
    }, []);

    const closeWebcam = () => {
        //@ts-ignore
        console.log(videoRef);
        //@ts-ignore
        videoRef.current.pause();
        //@ts-ignore

        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);

        postEmotions(values);
    };

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                //@ts-ignore
                video.srcObject = stream;
                //@ts-ignore

                video.play();
            })
            .catch((err) => {
                console.error('error:', err);
            });

        setInterval(() => {
            closeWebcam();
        }, 3000);
    };

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                //@ts-ignore
                const result = await faceapi.createCanvasFromMedia(
                    //@ts-ignore

                    videoRef.current,
                );

                console.log(result);

                //@ts-ignore
                canvasRef.current.innerHTML = result;
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi
                    .detectAllFaces(
                        //@ts-ignore
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions(),
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize,
                );

                detections.forEach(function (e) {
                    const sorted = [
                        'neutral',
                        'happy',
                        'sad',
                        'angry',
                        'fearful',
                        'surprised',
                    ]
                        .map(function (expression) {
                            return {
                                expression: expression,
                                //@ts-ignore
                                probability: e.expressions[expression],
                            };
                        })
                        .sort(function (e0, e1) {
                            //@ts-ignore
                            return e1.probability - e0.probability;
                        }) as Array<any>;

                    //@ts-ignore
                    const resultsToDisplay = sorted.filter(function (expr) {
                        return expr.probability > 0.1;
                    });

                    resultsToDisplay.map(function (expr) {
                        setValues((v) => {
                            return {
                                ...v,
                                [expr.expression]:
                                    //@ts-ignore
                                    (v?.[expr.expression] ?? 0) + 1,
                            };
                        });
                        setValues((v) => ({
                            ...v,

                            //@ts-ignore
                            ['surprise']: v.surprised ?? 0,
                        }));
                        setValues((v) => ({
                            ...v,
                            //@ts-ignore
                            ['fear']: v.fearful ?? 0,
                        }));
                    });
                });

                canvasRef &&
                    canvasRef.current &&
                    canvasRef.current
                        //@ts-ignore
                        .getContext('2d')
                        .clearRect(0, 0, videoWidth, videoHeight);
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawDetections(
                        canvasRef.current,
                        resizedDetections,
                    );
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawFaceExpressions(
                        canvasRef.current,
                        resizedDetections,
                    );
            }
        }, 1000);
    };

    return (
        <section
            style={{ background: `url(${bg2}) center center/cover no-repeat` }}
            className={b()}
        >
            <div>
                {captureVideo && modelsLoaded ? (
                    <div
                        style={{
                            background: `url(${button}) center center/cover no-repeat`,
                        }}
                    ></div>
                ) : (
                    <>
                        <h1 className={b('h1')}>Запечатлите свою эмоцию</h1>
                        <div className={b('wrapper')}>
                            <div
                                style={{
                                    background: `url(${button}) center center/cover no-repeat`,
                                    height: '500px',
                                }}
                            ></div>
                            <div
                                style={{
                                    background: `url(${buttonCr}) center center/cover no-repeat`,
                                }}
                                onClick={startVideo}
                                className={b('btn')}
                            ></div>
                        </div>
                        <h3 className={b('h3')}>
                            Мы определим ее и покажем по ней статистику, а также
                            поможем детально узнать себя, свои эмоции и научим
                            управлять ими
                        </h3>
                    </>
                )}
            </div>
            {captureVideo ? (
                modelsLoaded ? (
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '10px',
                            }}
                        >
                            <video
                                //@ts-ignore

                                ref={videoRef}
                                height={videoHeight}
                                width={videoWidth}
                                onPlay={handleVideoOnPlay}
                                style={{ borderRadius: '10px' }}
                            />
                            <canvas
                                //@ts-ignore

                                ref={canvasRef}
                                style={{ position: 'absolute' }}
                            />
                        </div>
                    </div>
                ) : (
                    <div>loading...</div>
                )
            ) : (
                <></>
            )}
            <AboutEmotionSection type={AboutEmotionSectionType.ANGRY} />
        </section>
    );
};
