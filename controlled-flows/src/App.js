import React, { useState } from "react";

import { ControlledFlow, UncontrolledFlow } from "./components/controlled-flow";

const Step1 = ({ goNext }) => {
  return (
    <>
      <h1>Step #1: Enter your name</h1>
      <button onClick={() => goNext({ name: "John Doe" })}>Next</button>
    </>
  );
};

const Step2 = ({ goNext }) => {
  return (
    <>
      <h1>Step #2: Enter your age</h1>
      <button onClick={() => goNext({ age: 30 })}>Next</button>
    </>
  );
};

const Step3 = ({ goNext }) => {
  return (
    <>
      <h1>Congratulations! You are now a US citizen</h1>
      <button onClick={() => goNext({ country: "USA" })}>Next</button>
    </>
  );
};

const Step4 = ({ goNext }) => {
  return (
    <>
      <h1>Step #4: Enter your country</h1>
      <button onClick={() => goNext({ country: "USA" })}>Next</button>
    </>
  );
};

function App() {
  const [data, setData] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const goNext = (dataFromStep) => {
    const newData = {
      ...data,
      ...dataFromStep,
    };

    console.log("newData", newData);
    setData(newData);
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <>
      <ControlledFlow
        currentIndex={currentStepIndex}
        onNext={goNext}
        onDone={(data) =>
          alert("Yehhhhh 🎉 ", `${data.name} is now a citizen!`)
        }
      >
        <Step1 />
        <Step2 />
        {data.age > 25 && <Step3 />}
        <Step4 />
      </ControlledFlow>
    </>
  );
}

export default App;
