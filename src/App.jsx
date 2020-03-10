import React, { useState, useEffect } from "react";
// import AudioAnalyser from "./AudioAnalyser";
import AudioAnalyser from "./componentanalyser";

export default function App() {
  const [audio, setAudio] = useState(null);

  let getMicrophone = async () => {
    console.log("getting microphone");

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setTimeout(setAudio(audio), 2000);
  };

  useEffect(() => {
    getMicrophone();
  }, []);

  // let stopMicrophone = () => {
  //   console.log("stopping mic");

  //   audio.forEach(track => {
  //     track.stop();
  //   });
  //   setAudio(null);
  // };

  // const toggleMicrophone = () => {
  //   audio ? stopMicrophone() : getMicrophone();
  // };

  return (
    <div className="App">
      {/* <div className="controls">
        <button onClick={toggleMicrophone}> Get microphone input </button>{" "}
      </div>{" "} */}
      {audio ? <AudioAnalyser audio={audio} /> : ""}
    </div>
  );
}
