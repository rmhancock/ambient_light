import React, { Component } from "react";
import AudioVisualiser from "./Visualiser";
import Helmet from "react-helmet";

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    const decibel = Math.min(
      (this.state.audioData.reduce((prev, cur) => {
        return Math.max(cur, prev);
      }, 0) -
        128) *
        9 +
        50
    );

    return (
      <div className="crazy">
        <Helmet>
          <style>{`
            .crazy {
              background-color: rgba(${Math.min(
                decibel * 0.4,
                255
              )}, ${Math.min(decibel * 2.7, 255)}, ${Math.min(
            decibel * 3,
            200
          )}, 255);
            }
            `}</style>
        </Helmet>
        <div>{decibel}</div>
        <AudioVisualiser audioData={this.state.audioData} />
      </div>
    );
  }
}

export default AudioAnalyser;
