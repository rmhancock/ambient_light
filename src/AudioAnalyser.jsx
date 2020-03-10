import React, { useEffect, useState } from "react";

export default function AudioAnalyser(props) {
  const [audioData, setaudioData] = useState(new Uint8Array(0));

  let analyser;
  let dataArray;
  let rafId;

  useEffect(() => {
    const audioContext = new window.AudioContext();
    analyser = audioContext.createAnalyser();
    console.log(analyser.frequencyBinCount);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    let source = audioContext.createMediaStreamSource(props.audio);
    source.connect(analyser);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    };
  });

  const tick = () => {
    console.log("tick");

    setTimeout(() => {
      analyser.getByteTimeDomainData(dataArray);
      setaudioData(dataArray);
      // console.log(dataArray);

      rafId = requestAnimationFrame(tick);
    }, 2000);
  };

  return <div>{audioData}</div>;
}
