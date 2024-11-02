import {
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  Button,
  Typography,
} from "antd";
import React, {
  useState
} from "react";

import {
  intervals,
  directions,
} from "../../constants"

import './TrainingOptions.css'

function TrainingOptions(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
    <React.Fragment>
      <Button
        className="sidebar-open-button"
        size="large"
        color="primary"
        variant="outlined"
        onClick={() => { setSidebarOpen(true) }}
        icon={<MenuOutlined />}
        shape="circle"
      />
      <div
        className="controls"
        style={{
          "--translate-x-size": sidebarOpen ? "0%" : "100%",
        }}
      >
        <Button
          className="sidebar-close-button"
          size="large"
          color="primary"
          variant="outlined"
          onClick={() => { setSidebarOpen(false) }}
          icon={<CloseOutlined />}
          shape="circle"
        />
        <div className="controls-scroll">
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
              shape="round"
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
              shape="round"
              color="primary"
              variant={props.options.semitones.has(interval.semitone) ? "solid" : "filled"}
              onClick={() => { toggleSemitone(interval.semitone) }}
            >
              {interval.name}
            </Button>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default TrainingOptions;
