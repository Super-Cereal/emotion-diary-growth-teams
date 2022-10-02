import b_ from 'b_';
import * as faceapi from 'face-api.js';
import React from 'react';

import './JournalPage.scss';

const b = b_.with('journal-page');

export const JournalPage = () => {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const [values, setValues] = React.useState({});

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
    };

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                //@ts-ignore

                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                    //@ts-ignore

                    videoRef.current,
                );
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
                        'disgusted',
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

    const closeWebcam = () => {
        //@ts-ignore

        videoRef.current.pause();
        //@ts-ignore

        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
                {captureVideo && modelsLoaded ? (
                    <button
                        onClick={closeWebcam}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '15px',
                            fontSize: '25px',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    >
                        Close Webcam
                    </button>
                ) : (
                    <button
                        onClick={startVideo}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '15px',
                            fontSize: '25px',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    >
                        Open Webcam
                    </button>
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
        </div>
    );
};
