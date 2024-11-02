import {
  Button,
  Typography,
} from "antd";

import {
  intervals,
  directions,
} from "../../constants"

import './TrainingOptions.css'

function TrainingOptions(props) {
  const setDirection = (directionKey) => {
    props.setOptions((prevOptions) => ({
      ...prevOptions,
      direction: directionKey,
    }))
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
      {Object.entries(directions).map(([key, direction]) => (
        <Button
          key={key}
          className="option-button direction-button"
          color="primary"
          variant={props.options.direction === key ? "solid" : "filled"}
          onClick={() => { setDirection(key) }}
        >
          {direction.name}
        </Button>
      ))}
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
          variant={props.options.semitones.has(interval.semitone) ? "solid" : "filled"}
          onClick={() => { toggleSemitone(interval.semitone) }}
        >
          {interval.name}
        </Button>
      ))}
    </div>
  )
}

export default TrainingOptions;
