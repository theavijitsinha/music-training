import {
  useState,
} from "react";
import {
  Sampler,
  start as audioStart,
  now as toneNow,
} from "tone";

import logo from './logo.svg';
import './App.css';

function App() {
  const [toneLoaded, setToneLoaded] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={initializeAudio}>Start Audio</button>
        <button disabled={!(toneLoaded && audioStarted)} onClick={playC4E4}>Play!!</button>
      </header>
    </div>
  );
}

export default App;
