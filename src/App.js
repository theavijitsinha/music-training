import {
  Button,
} from "antd";
import {
  useState,
} from "react";
import {
  Sampler,
  start as audioStart,
  now as toneNow,
} from "tone";

import './App.css';

function AudioPlayer() {
  const [toneLoaded, setToneLoaded] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [playerStarted, setPlayerStarted] = useState(false);

  const sampler = new Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => {
      setToneLoaded(true);
    },
  }).toDestination();

  const initializeAudio = () => {
    audioStart()
      .then(() => {
        setAudioStarted(true);
      });
  }

  const playC4E4 = () => {
    //play a middle 'C' for the duration of an 8th note
    sampler.triggerAttackRelease("C4", "8n", toneNow());
    //play a middle 'E' for the duration of an 8th note
    sampler.triggerAttackRelease("E4", "8n", toneNow() + 0.5);
  };

  return (
    <div className="player">
      {playerStarted ?
        <Button
          type="primary"
          disabled={!(toneLoaded && audioStarted)}
          onClick={playC4E4}>
          Play Interval
        </Button>
        :
        <Button
          type="primary"
          onClick={() => {
            initializeAudio();
            setPlayerStarted(true);
          }}>
          Start
        </Button>
      }
    </div>
  )
}

function IntervalOptions() {
  const [intervals, setIntervals] = useState({
    "Minor 2nd": false,
    "Major 2nd": true,
    "Minor 3rd": false,
    "Major 3rd": true,
    "Perfect 4th": true,
    "Perfect 5th": true,
  });

  const toggleInterval = (interval) => {
    setIntervals((prevIntervals) => ({
      ...prevIntervals,
      [interval]: !prevIntervals[interval],
    }))
  }

  return (
    <div className="controls">
      {Object.keys(intervals).map((interval) => (
        <Button
          key={interval}
          className="interval-button"
          color="primary"
          variant={intervals[interval] ? "solid" : "outlined"}
          onClick={() => { toggleInterval(interval) }}
        >
          {interval}
        </Button>
      ))}
    </div>
  )
}

function Page() {
  return (
    <div className="container">
      <AudioPlayer />
      <IntervalOptions />
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Page />
    </div>
  );
}

export default App;
