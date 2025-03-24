import React from "react";

export const ControlledFlow = ({ children, currentIndex, onNext, onDone }) => {
  const goNext = (data) => {
    onNext(data);

    if (currentIndex > 2) {
      onDone(data);
    }
  };

  const currentChild = React.Children.toArray(children)[currentIndex];

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goNext });
  }

  return currentChild;
};
