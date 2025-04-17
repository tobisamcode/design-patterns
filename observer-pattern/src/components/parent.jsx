import mitt from "mitt";

import Buttons from "./buttons";
import Counter from "./counter";

export const emitter = mitt();

function Parent() {
  return (
    <>
      <Buttons />
      <Counter />
    </>
  );
}

export default Parent;
