import {
  useEffect,
} from 'react';
import {
  Synth,
} from "tone";

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
  })

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
      </header>
    </div>
  );
}

export default App;
