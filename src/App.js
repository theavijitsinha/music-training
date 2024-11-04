import {
  ConfigProvider,
  theme,
} from "antd";
import {
  useState,
} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom/dist";

import IntervalQuiz from "./components/IntervalQuiz/IntervalQuiz";
import TrainingOptions from "./components/TrainingOptions/TrainingOptions";

import './App.css';

function Root() {
  return (
    <div className="root-page" />
  )
}

function IntervalsTrainingPage() {
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
    <div className="intervals-training-page">
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
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
    },
    {
      path: "intervals",
      element: <IntervalsTrainingPage />,
    },
  ],
    {
      basename: "/music/training",
    }
  );
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
        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  );
}

export default App;
