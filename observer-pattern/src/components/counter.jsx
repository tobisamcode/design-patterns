import React, { useEffect } from "react";
import { emitter } from "./parent";

const Counter = () => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    const onIncrementCounter = () => {
      setCount((count) => count + 1);
    };
    const onDecrementCounter = () => {
      setCount((count) => count - 1);
    };

    emitter.on("inc.", onIncrementCounter);
    emitter.on("dec.", onDecrementCounter);

    return () => {
      emitter.off("inc.", onIncrementCounter);
      emitter.off("dec.", onDecrementCounter);
    };
  }, []);

  return <div>#: {count}</div>;
};

export default Counter;
