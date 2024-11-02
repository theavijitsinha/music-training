import {
  CaretRightFilled,
  StepForwardFilled,
} from "@ant-design/icons";
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

import './IntervalQuiz.css'
import { intervals } from "../../constants";

function IntervalQuiz(props) {
  const [toneLoaded, setToneLoaded] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [playerStarted, setPlayerStarted] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(null)
  const [currentSemitone, setCurrentSemitone] = useState(null)
  const [currentDirection, setCurrentDirection] = useState("asc")
  const [semitoneChoices, setSemitoneChoices] = useState(new Set())
  const [chosenSemitone, setChosenSemitone] = useState(null)

  const notes = {
    "C": 0,
    "C#": 1,
    "D": 2,
    "D#": 3,
    "E": 4,
    "F": 5,
    "F#": 6,
    "G": 7,
    "G#": 8,
    "A": 9,
    "A#": 10,
    "B": 11,
  }
  const firstOctave = 3
  const lastOctave = 6

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

  const noteRangeFilter = (note, octave, direction, semitone) => {
    if (octave < firstOctave) return false;
    if (octave > lastOctave) return false;
    if (direction === "asc" || direction === "har") {
      if (octave < lastOctave) return true;
      const noteNumber = notes[note]
      return (noteNumber + semitone) < Object.keys(notes)
    }
    if (direction === "des") {
      if (octave > firstOctave) return true;
      const noteNumber = notes[note]
      return (noteNumber - semitone) >= 0;
    }
  }

  const calculateSecondNote = (note, octave, direction, semitone) => {
    const rootNoteNumber = notes[note]
    let secondOctave = octave
    let secondNoteNumber = direction === "asc" || direction === "har" ? rootNoteNumber + semitone :
      direction === "des" ? rootNoteNumber - semitone : null
    if (secondNoteNumber >= Object.keys(notes).length) {
      secondOctave += 1
      secondNoteNumber -= Object.keys(notes).length
    } else if (secondNoteNumber < 0) {
      secondOctave -= 1
      secondNoteNumber += Object.keys(notes).length
    }
    let secondNote = Object.entries(notes)
      .filter(([_, noteNumber]) => noteNumber === secondNoteNumber)[0][0]
    return {
      octave: secondOctave,
      note: secondNote,
    }
  }

  const generateNotesPair = () => {
    let semitoneChoices = [...props.options.semitones]
    const semitone = semitoneChoices[Math.floor(Math.random() * semitoneChoices.length)];
    const direction = props.options.direction
    let rootChoices = []
    for (const octaveStr in props.options.roots) {
      const octave = Number(octaveStr)
      if (!props.options.roots.hasOwnProperty(octave)) continue;
      let rootNoteChoices = [...props.options.roots[octave]]
        .filter((note) => noteRangeFilter(note, octave, direction, semitone))
      for (const note of rootNoteChoices) {
        rootChoices.push({
          octave: octave,
          note: note,
        })
      }
    }
    const rootNote = rootChoices[Math.floor(Math.random() * rootChoices.length)]
    const secondNote = calculateSecondNote(rootNote.note, rootNote.octave, direction, semitone)
    return {
      rootNote: rootNote,
      secondNote: secondNote,
      semitone: semitone,
    }
  }

  const setRandomInterval = () => {
    const {rootNote, secondNote, semitone} = generateNotesPair()
    let rootNoteStr = rootNote.note + String(rootNote.octave)
    let secondNoteStr = secondNote.note + String(secondNote.octave)
    setCurrentInterval([rootNoteStr, secondNoteStr])
    setCurrentSemitone(semitone)
    setCurrentDirection(props.options.direction)
  }

  const playInterval = () => {
    const timeGap = props.options.timeGap
    const secondNoteDelay = currentDirection === "har" ? 0 : timeGap
    sampler.triggerAttackRelease(currentInterval[0], timeGap, toneNow());
    sampler.triggerAttackRelease(currentInterval[1], timeGap, toneNow() + secondNoteDelay);
  };

  const createNewLevel = () => {
    setRandomInterval()
    setSemitoneChoices(new Set(props.options.semitones))
    setChosenSemitone(null)
  }

  const submitAnswer = (semitone) => {
    setChosenSemitone(semitone)
  }

  return (
    <div className="player">
      {playerStarted ?
        <div className="audio-controls">
          <Button
            className="play-button"
            type="primary"
            disabled={!(toneLoaded && audioStarted && currentInterval !== null)}
            onClick={playInterval}
            icon={<CaretRightFilled style={{
              fontSize: "2.5rem",
              marginLeft: "0.3rem",
            }} />}
            shape="circle"
          />
          <Button
            className="next-button"
            color="primary"
            variant="outlined"
            disabled={!(toneLoaded && audioStarted && currentInterval !== null)}
            onClick={() => {
              setInterval(null)
              createNewLevel()
            }}
            icon={<StepForwardFilled style={{
              fontSize: "2rem",
            }} />}
            shape="circle"
          />
          <div className="answer-choices">
            {Object.entries(intervals)
              .filter(([_, interval]) => (semitoneChoices.has(interval.semitone)))
              .map(([key, interval]) => {
                let style = {}
                let color = "default"
                let variant = "outlined"
                if (chosenSemitone === null) {
                  color = "primary"
                } else if (interval.semitone === currentSemitone) {
                  style = {
                    backgroundColor: "#6bcb6f",
                  }
                  variant = "solid"
                } else if (interval.semitone === chosenSemitone) {
                  style = {
                    backgroundColor: "#ff7465",
                  }
                  variant = "solid"
                }
                return (
                  <Button
                    key={key}
                    className="choice-button"
                    color={color}
                    style={style}
                    variant={variant}
                    onClick={() => {
                      if (chosenSemitone !== null) return;
                      submitAnswer(interval.semitone)
                    }}
                    shape="round"
                  >
                    {interval.name}
                  </Button>
                )
              })}
          </div>
        </div>
        :
        <Button
          type="primary"
          onClick={() => {
            initializeAudio();
            setPlayerStarted(true);
            createNewLevel();
          }}
        >
          Start
        </Button>
      }
    </div>
  )
}

export default IntervalQuiz;
