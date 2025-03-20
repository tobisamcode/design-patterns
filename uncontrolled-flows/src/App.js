import React from "react";

import { UncontrolledFlow } from "./components/uncontrolled-flow";

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
      <h1>Step #3: Enter your country</h1>
      <button onClick={() => goNext({ country: "USA" })}>Next</button>
    </>
  );
};

function App() {
  return (
    <>
      <UncontrolledFlow
        onDone={(data) => {
          alert(`🎉 Yehhhh ${data.name}, you made to the final step!`);
        }}
      >
        <Step1 />
        <Step2 />
        <Step3 />
      </UncontrolledFlow>
    </>
  );
}

export default App;
