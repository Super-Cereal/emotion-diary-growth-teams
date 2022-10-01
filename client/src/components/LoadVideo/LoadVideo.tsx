import RecordRTC from "recordrtc";

import { postImages } from "../../store/images/init";

export const LoadVideo = () => {
  const handleClick = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(async function (stream: any) {
        const recorder = new RecordRTC(stream, {
          type: "video",
        });

        recorder.startRecording();

        const sleep = (m: number) => new Promise((r) => setTimeout(r, m));
        await sleep(3000);

        recorder.stopRecording(function () {
          const blob = recorder.getBlob();
          const formData = new FormData();
          formData.append("webm", blob, "video.webm");
          postImages(formData);
        });
      });
  };

  return <button onClick={handleClick}>Начать снимать видос</button>;
};
