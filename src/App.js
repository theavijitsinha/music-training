import {
  ConfigProvider,
  theme,
} from "antd";
import {
  useState,
} from "react";

import IntervalQuiz from "./components/IntervalQuiz/IntervalQuiz";
import TrainingOptions from "./components/TrainingOptions/TrainingOptions";

import './App.css';

function Page() {
  const [options, setOptions] = useState({
    timeGap: 0.75,
    direction: "asc",
    roots: {
      4: new Set(["C", "D", "E"]),
      5: new Set(["C", "D"]),
    },
    semitones: new Set([2, 4, 5, 7]),
  });

  return (
    <div className="container page">
      <IntervalQuiz
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
          colorPrimary: "#c3e3ff",
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
