import {
  Button,
  ConfigProvider,
  theme,
  Typography,
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

function AudioPlayer(props) {
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
    sampler.triggerAttackRelease("C4", 0.75, toneNow());
    //play a middle 'E' for the duration of an 8th note
    sampler.triggerAttackRelease("E4", 0.75, toneNow() + 0.75);
  };

  return (
    <div className="container player">
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

function TrainingOptions(props) {
  const intervals = {
    "m2": {
      name: "Minor 2nd",
      semitone: 1,
    },
    "M2": {
      name: "Major 2nd",
      semitone: 2,
    },
    "m3": {
      name: "Minor 3rd",
      semitone: 3,
    },
    "M3": {
      name: "Major 3rd",
      semitone: 4,
    },
    "P4": {
      name: "Perfect 4th",
      semitone: 5,
    },
    "TT": {
      name: "Tritone",
      semitone: 6,
    },
    "P5": {
      name: "Perfect 5th",
      semitone: 7,
    },
    "m6": {
      name: "Minor 6th",
      semitone: 8,
    },
    "M6": {
      name: "Major 6th",
      semitone: 9,
    },
    "m7": {
      name: "Minor 7th",
      semitone: 10,
    },
    "M7": {
      name: "Major 7th",
      semitone: 11,
    },
    "P8": {
      name: "Perfect Octave",
      semitone: 12,
    },
  }

  const toggleSemitone = (semitone) => {
    props.setOptions((prevOptions) => {
      let semitones = new Set(prevOptions.semitones)
      semitones.has(semitone) ?
        semitones.delete(semitone) :
        semitones.add(semitone);
      return {
        ...prevOptions,
        semitones: semitones,
      }
    })
  }

  return (
    <div className="container controls">
      <Typography.Title
        level={2}
      >
        Options
      </Typography.Title>
      <Typography.Title
        level={3}
      >
        Playback direction
      </Typography.Title>
      <Button.Group className="direction-button-group">
        <Button
          className="option-button direction-button"
          color="primary"
          variant="solid"
          onClick={() => { }}
        >
          Ascending
        </Button>
        <Button
          className="option-button direction-button"
          color="primary"
          variant="solid"
          onClick={() => { }}
        >
          Descending
        </Button>
        <Button
          className="option-button direction-button"
          color="primary"
          variant="outlined"
          onClick={() => { }}
        >
          Harmonic
        </Button>
      </Button.Group>
      <Typography.Title
        level={3}
      >
        Intervals
      </Typography.Title>
      {Object.entries(intervals).map(([key, interval]) => (
        <Button
          key={key}
          className="option-button interval-button"
          color="primary"
          variant={props.options.semitones.has(interval.semitone) ? "solid" : "outlined"}
          onClick={() => { toggleSemitone(interval.semitone) }}
        >
          {interval.name}
        </Button>
      ))}
    </div>
  )
}

function Page() {
  const [options, setOptions] = useState({
    timeGap: 0.75,
    directions: new Set(["asc"]),
    roots: new Set(["C4"]),
    semitones: new Set([2, 4, 5, 7]),
  });

  return (
    <div className="container page">
      <AudioPlayer
        options={options}
      />
      <TrainingOptions
        options={options}
        setOptions={setOptions}
      />
    </div>
  )
}

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#4ceaff",
          colorTextLightSolid: "#141414",
          colorBgContainer: "#141414",
        }
      }}
    >
      <div
        className="app"
        style={{
          backgroundColor: "#141414",
        }}
      >
        <Page />
      </div>
    </ConfigProvider>
  );
}

export default App;
