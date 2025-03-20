import React, { useState } from "react";

export const UncontrolledFlow = ({ children, onDone }) => {
  const [data, setData] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const goNext = (dataFronStep) => {
    const nextStepindex = currentStepIndex + 1;

    const newData = {
      ...data,
      ...dataFronStep,
    };

    console.log("newData", newData);

    if (nextStepindex < children.length) {
      setCurrentStepIndex(nextStepindex);
    } else {
      onDone(newData);
    }

    setData(newData);
  };

  const currentChild = React.Children.toArray(children)[currentStepIndex];

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goNext });
  }

  return currentChild;
};
