import {
  Button,
  Typography,
} from "antd";

import './TrainingOptions.css'

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

export default TrainingOptions;
