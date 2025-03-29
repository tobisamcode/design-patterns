import { RedButton, SmallGreenButton } from "./components/composition";
import { SmallRedButton } from "./components/partial";
import { Recursive } from "./components/recursive";

const myNestedObject = {
  key1: "value1",
  key2: {
    innerKey1: "innerValue1",
    innerKey2: {
      innerInnerKey1: "innerInnerValue1",
      innerInnerKey2: "innerInnerValue2",
    },
  },
  key3: "value3",
};

function App() {
  return (
    <>
      <Recursive data={myNestedObject} />
      {/* <SmallGreenButton text='I am a small green button' />
      <RedButton text='I am a red button' />  */}
      <SmallRedButton text='I am a small red button' />

    </>
  );
}

export default App;
